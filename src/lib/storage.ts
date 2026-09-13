import { InsightItem } from "./types";
import { initialInsights } from "./initialData";

const STORAGE_KEY = "data_learners_community_insights_v1";

export function getLocalInsights(): InsightItem[] {
  if (typeof window === "undefined") {
    return initialInsights;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInsights));
      return initialInsights;
    }
    const parsed: InsightItem[] = JSON.parse(saved);
    // Merge any missing initial items with user-submitted items
    const existingIds = new Set(parsed.map((item) => item.id));
    const merged = [
      ...parsed,
      ...initialInsights.filter((item) => !existingIds.has(item.id))
    ];
    return merged;
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
    // Add new insight at the top
    const updated = [newInsight, ...current.filter((item) => item.id !== newInsight.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
    return [newInsight, ...initialInsights];
  }
}

export function deleteLocalInsight(id: string): InsightItem[] {
  if (typeof window === "undefined") return initialInsights;
  try {
    const current = getLocalInsights();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error("Failed to delete from localStorage:", error);
    return initialInsights;
  }
}

export function getInsightById(id: string): InsightItem | undefined {
  const all = getLocalInsights();
  return all.find((item) => item.id === id);
}

