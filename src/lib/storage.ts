import { InsightItem } from "./types";
import { initialInsights } from "./initialData";

const STORAGE_KEY = "data_learners_community_insights_v2";
const DELETED_KEY = "data_learners_deleted_ids_v2";

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
      // First time loading: seed with initialInsights
      items = initialInsights;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } else {
      items = JSON.parse(saved);
    }

    // STRICT: Filter out any items that have been deleted
    const activeItems = items.filter((item) => !deletedIds.has(item.id));
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
    // Add new insight at the top, removing any duplicate
    const updated = [newInsight, ...current.filter((item) => item.id !== newInsight.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also remove from deletedIds if re-submitting with same id
    const deleted = getDeletedIds();
    if (deleted.has(newInsight.id)) {
      deleted.delete(newInsight.id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deleted)));
    }

    // Notify other components
    window.dispatchEvent(new Event("data-learners-storage-updated"));
    return updated;
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
    return [newInsight, ...initialInsights];
  }
}

export function deleteLocalInsight(id: string): InsightItem[] {
  if (typeof window === "undefined") return [];

  try {
    // 1. Permanently record this ID as deleted so it can NEVER resurrect
    recordDeletedId(id);

    // 2. Remove it from active items list
    const current = getLocalInsights();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    // 3. Notify listeners
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
