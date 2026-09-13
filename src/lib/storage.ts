import { InsightItem, CommentItem } from "./types";
import { initialInsights } from "./initialData";

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
      // If initialInsights has new items not in localStorage, merge them in (unless deleted)
      const existingIds = new Set(items.map((i) => i.id));
      for (const init of initialInsights) {
        if (!existingIds.has(init.id) && !deletedIds.has(init.id)) {
          items.push(init);
        }
      }
    }

    // Filter out deleted items
    const activeItems = items
      .filter((item) => !deletedIds.has(item.id))
      .map((item) => ({
        ...item,
        upvotes: typeof item.upvotes === "number" ? item.upvotes : 1,
        comments: Array.isArray(item.comments) ? item.comments : []
      }));

    // Reddit style sorting: Sort by upvotes (highest first)
    activeItems.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

    return activeItems;
  } catch (error) {
    console.error("Failed to read from localStorage:", error);
    return initialInsights;
  }
}

export function saveLocalInsight(newInsight: InsightItem): InsightItem[] {
  if (typeof window === "undefined") {
    return [newInsight, ...initialInsights];
  }

  try {
    const current = getLocalInsights();
    const cleanInsight: InsightItem = {
      ...newInsight,
      upvotes: newInsight.upvotes || 1,
      comments: newInsight.comments || []
    };

    const updated = [cleanInsight, ...current.filter((item) => item.id !== cleanInsight.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const deleted = getDeletedIds();
    if (deleted.has(cleanInsight.id)) {
      deleted.delete(cleanInsight.id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deleted)));
    }

    window.dispatchEvent(new Event("data-learners-storage-updated"));
    return updated;
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
    return [newInsight, ...initialInsights];
  }
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
    return updatedComments;
  } catch (err) {
    console.error("Failed to add comment:", err);
    return [];
  }
}

export function deleteLocalInsight(id: string): InsightItem[] {
  if (typeof window === "undefined") return [];

  try {
    recordDeletedId(id);
    const current = getLocalInsights();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    window.dispatchEvent(new Event("data-learners-storage-updated"));
    return filtered;
  } catch (error) {
    console.error("Failed to delete from localStorage:", error);
    return [];
  }
}

export function getInsightById(id: string): InsightItem | undefined {
  const all = getLocalInsights();
  return all.find((item) => item.id === id);
}
