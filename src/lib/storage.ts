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
    upvotes: typeof row.upvotes === "number" ? row.upvotes : 1,
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
    upvotes: item.upvotes || 1,
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
      .map((item) => ({
        ...item,
        upvotes: typeof item.upvotes === "number" ? item.upvotes : 1,
        comments: Array.isArray(item.comments) ? item.comments : []
      }));

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
    upvotes: newInsight.upvotes || 1,
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

export function upvoteLocalInsight(id: string): number {
  if (typeof window === "undefined") return 0;

  try {
    const current = getLocalInsights();
    let newCount = 1;
    const updated = current.map((item) => {
      if (item.id === id) {
        newCount = (item.upvotes || 0) + 1;
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

    return newCount;
  } catch (err) {
    console.error("Failed to upvote:", err);
    return 0;
  }
}

export function addCommentToInsight(insightId: string, author: string, text: string): CommentItem[] {
  if (typeof window === "undefined") return [];

  try {
    const current = getLocalInsights();
    const newComment: CommentItem = {
      id: "comment-" + Date.now().toString(),
      author: author.trim() || "Aspiring Data Learner",
      text: text.trim(),
      createdAt: new Date().toISOString().split("T")[0]
    };

    let updatedComments: CommentItem[] = [];
    const updated = current.map((item) => {
      if (item.id === insightId) {
        const existingComments = Array.isArray(item.comments) ? item.comments : [];
        updatedComments = [...existingComments, newComment];
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
