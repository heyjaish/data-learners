import { InsightItem, CommentItem } from "./types";
import { initialInsights } from "./initialData";
import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEY = "data_learners_community_insights_v3";
const DELETED_KEY = "data_learners_deleted_ids_v3";

function getDeletedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function recordDeletedId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const deleted = getDeletedIds();
    deleted.add(id);
    localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deleted)));
  } catch (err) {
    console.error("Failed to record deleted ID:", err);
  }
}

// Convert database snake_case row to TypeScript camelCase InsightItem
export function toInsightItem(row: any): InsightItem {
  return {
    id: row.id,
    contributorName: row.contributor_name || row.contributorName || "Anonymous",
    contributorRole: row.contributor_role || row.contributorRole || "Data Professional",
    company: row.company || "Tech & Analytics",
    experienceYears: row.experience_years || row.experienceYears || "Fresher",
    linkedinUrl: row.linkedin_url || row.linkedinUrl || undefined,
    domain: row.domain || "Data Analyst",
    title: row.title || "Career Advice",
    summary: row.summary || "",
    content: row.content || "",
    createdAt: row.created_at || row.createdAt || new Date().toISOString().split("T")[0],
    readTime: row.read_time || row.readTime || "3 min read",
    upvotes: typeof row.upvotes === "number" ? row.upvotes : 0,
    comments: Array.isArray(row.comments) ? row.comments : []
  };
}

// Convert TypeScript camelCase InsightItem to database snake_case row
export function toDbRow(item: InsightItem): any {
  return {
    id: item.id,
    contributor_name: item.contributorName,
    contributor_role: item.contributorRole,
    company: item.company,
    experience_years: item.experienceYears,
    linkedin_url: item.linkedinUrl || null,
    domain: item.domain,
    title: item.title,
    summary: item.summary,
    content: item.content,
    created_at: item.createdAt,
    read_time: item.readTime,
    upvotes: typeof item.upvotes === "number" ? item.upvotes : 0,
    comments: item.comments || []
  };
}

// Async function to fetch latest data directly from Supabase
export async function fetchRemoteInsights(): Promise<InsightItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalInsights();
  }

  try {
    const { data, error } = await supabase
      .from("insights")
      .select("*")
      .order("upvotes", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error, using local cache:", error.message);
      return getLocalInsights();
    }

    if (data && data.length > 0) {
      const items = data.map(toInsightItem);
      // Sync into localStorage for instant load on subsequent visits
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
      return items;
    }

    return getLocalInsights();
  } catch (err) {
    console.warn("Supabase network error:", err);
    return getLocalInsights();
  }
}

let isSyncing = false;
function triggerBackgroundSync() {
  if (typeof window === "undefined" || isSyncing || !isSupabaseConfigured || !supabase) return;
  isSyncing = true;
  fetchRemoteInsights()
    .then((remoteItems) => {
      isSyncing = false;
      if (remoteItems && remoteItems.length > 0) {
        window.dispatchEvent(new Event("data-learners-storage-updated"));
      }
    })
    .catch(() => {
      isSyncing = false;
    });
}

export function getLocalInsights(): InsightItem[] {
  if (typeof window === "undefined") {
    return initialInsights;
  }

  try {
    const deletedIds = getDeletedIds();
    const saved = localStorage.getItem(STORAGE_KEY);

    let items: InsightItem[] = [];
    if (!saved) {
      items = initialInsights;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      items = JSON.parse(saved);
      const existingIds = new Set(items.map((i) => i.id));
      for (const init of initialInsights) {
        if (!existingIds.has(init.id) && !deletedIds.has(init.id)) {
          items.push(init);
        }
      }
    }

    const activeItems = items
      .filter((item) => !deletedIds.has(item.id))
      .map((item) => {
        // Clean out legacy mock comments if present in cache
        const cleanedComments = (Array.isArray(item.comments) ? item.comments : []).filter(
          (c) => c.id !== "c-1" && c.author !== "Pooja"
        );
        return {
          ...item,
          upvotes: typeof item.upvotes === "number" ? item.upvotes : 0,
          comments: cleanedComments
        };
      });

    // Sort by upvotes (highest first)
    activeItems.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

    // Proactively sync from remote Supabase in background
    triggerBackgroundSync();

    return activeItems;
  } catch (error) {
    console.error("Failed to read from storage:", error);
    return initialInsights;
  }
}

export function saveLocalInsight(newInsight: InsightItem): InsightItem[] {
  const cleanInsight: InsightItem = {
    ...newInsight,
    upvotes: typeof newInsight.upvotes === "number" ? newInsight.upvotes : 0,
    comments: newInsight.comments || []
  };

  // 1. Optimistic local update for instant UI feedback
  if (typeof window !== "undefined") {
    try {
      const current = getLocalInsights();
      const updated = [cleanInsight, ...current.filter((item) => item.id !== cleanInsight.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      const deleted = getDeletedIds();
      if (deleted.has(cleanInsight.id)) {
        deleted.delete(cleanInsight.id);
        localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deleted)));
      }

      window.dispatchEvent(new Event("data-learners-storage-updated"));
    } catch (error) {
      console.error("Local save error:", error);
    }
  }

  // 2. Asynchronous sync to Supabase
  if (isSupabaseConfigured && supabase) {
    (async () => {
      try {
        const { error } = await supabase.from("insights").upsert(toDbRow(cleanInsight));
        if (error) console.error("Supabase upsert error:", error);
      } catch (err) {
        console.error("Supabase save network error:", err);
      }
    })();
  }

  return [cleanInsight, ...initialInsights];
}

const UPVOTED_POSTS_KEY = "data_learners_upvoted_posts_v2";

export function hasUserUpvoted(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(UPVOTED_POSTS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return list.includes(id);
  } catch {
    return false;
  }
}

export function toggleUpvoteLocalInsight(id: string): { newCount: number; hasUpvoted: boolean } {
  if (typeof window === "undefined") return { newCount: 0, hasUpvoted: false };

  try {
    const raw = localStorage.getItem(UPVOTED_POSTS_KEY);
    let list: string[] = raw ? JSON.parse(raw) : [];
    const alreadyUpvoted = list.includes(id);

    let delta = 0;
    let nowUpvoted = false;

    if (alreadyUpvoted) {
      // Toggle off / Undo upvote (-1)
      list = list.filter((itemId) => itemId !== id);
      delta = -1;
      nowUpvoted = false;
    } else {
      // Toggle on / Upvote (+1)
      list.push(id);
      delta = 1;
      nowUpvoted = true;
    }

    localStorage.setItem(UPVOTED_POSTS_KEY, JSON.stringify(list));

    const current = getLocalInsights();
    let newCount = 0;
    const updated = current.map((item) => {
      if (item.id === id) {
        newCount = Math.max(0, (item.upvotes || 0) + delta);
        return { ...item, upvotes: newCount };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("data-learners-storage-updated"));

    // Async sync to Supabase
    if (isSupabaseConfigured && supabase) {
      (async () => {
        try {
          const { error } = await supabase.from("insights").update({ upvotes: newCount }).eq("id", id);
          if (error) console.error("Supabase upvote error:", error);
        } catch (err) {
          console.error("Supabase upvote network error:", err);
        }
      })();
    }

    return { newCount, hasUpvoted: nowUpvoted };
  } catch (err) {
    console.error("Failed to toggle upvote:", err);
    return { newCount: 0, hasUpvoted: false };
  }
}

export function upvoteLocalInsight(id: string): number {
  return toggleUpvoteLocalInsight(id).newCount;
}

export function getSavedAuthorName(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("data_learners_saved_author_name") || "";
  } catch {
    return "";
  }
}

export function addCommentToInsight(insightId: string, author: string, text: string): CommentItem[] {
  if (typeof window === "undefined") return [];

  const cleanAuthor = author.trim() || "Aspiring Data Learner";
  const cleanText = text.trim();
  if (!cleanText) return [];

  try {
    localStorage.setItem("data_learners_saved_author_name", cleanAuthor);

    const current = getLocalInsights();
    const target = current.find((item) => item.id === insightId);
    if (!target) return [];

    const existingComments = Array.isArray(target.comments) ? target.comments : [];

    // Duplicate check: Prevent submitting exact duplicate comments
    const isDuplicate = existingComments.some(
      (c) => c.author.toLowerCase() === cleanAuthor.toLowerCase() && c.text.toLowerCase() === cleanText.toLowerCase()
    );
    if (isDuplicate) {
      return existingComments;
    }

    const newComment: CommentItem = {
      id: "comment-" + Date.now().toString(),
      author: cleanAuthor,
      text: cleanText,
      createdAt: new Date().toISOString().split("T")[0]
    };

    const updatedComments = [...existingComments, newComment];
    const updated = current.map((item) => {
      if (item.id === insightId) {
        return { ...item, comments: updatedComments };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("data-learners-storage-updated"));

    // Async sync to Supabase
    if (isSupabaseConfigured && supabase) {
      (async () => {
        try {
          const { error } = await supabase.from("insights").update({ comments: updatedComments }).eq("id", insightId);
          if (error) console.error("Supabase comment error:", error);
        } catch (err) {
          console.error("Supabase comment network error:", err);
        }
      })();
    }

    return updatedComments;
  } catch (err) {
    console.error("Failed to add comment:", err);
    return [];
  }
}

export function deleteLocalInsight(id: string): InsightItem[] {
  recordDeletedId(id);

  let filtered: InsightItem[] = [];
  if (typeof window !== "undefined") {
    try {
      const current = getLocalInsights();
      filtered = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("data-learners-storage-updated"));
    } catch (error) {
      console.error("Failed to delete from localStorage:", error);
    }
  }

  // Permanent deletion from Supabase
  if (isSupabaseConfigured && supabase) {
    (async () => {
      try {
        const { error } = await supabase.from("insights").delete().eq("id", id);
        if (error) console.error("Supabase delete error:", error);
      } catch (err) {
        console.error("Supabase delete network error:", err);
      }
    })();
  }

  return filtered;
}

export function getInsightById(id: string): InsightItem | undefined {
  const all = getLocalInsights();
  return all.find((item) => item.id === id);
}
