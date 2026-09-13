"use client";

import { useState, useEffect, useMemo } from "react";
import { Domain, InsightItem } from "@/lib/types";
import { getLocalInsights } from "@/lib/storage";
import InsightCard from "./InsightCard";
import Link from "next/link";
import { Sparkles, PlusCircle } from "lucide-react";

interface InsightsFeedProps {
  initialData?: InsightItem[];
}

const domains: Domain[] = [
  "All",
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "BI & Analytics"
];

export default function InsightsFeed({ initialData = [] }: InsightsFeedProps) {
  const [insights, setInsights] = useState<InsightItem[]>(initialData);
  const [selectedDomain, setSelectedDomain] = useState<Domain>("All");

  useEffect(() => {
    // Initial sync with local storage
    setInsights(getLocalInsights());

    // Auto-update if any item is deleted or added in admin/submit
    const handleStorageUpdate = () => {
      setInsights(getLocalInsights());
    };
    window.addEventListener("data-learners-storage-updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("data-learners-storage-updated", handleStorageUpdate);
    };
  }, []);

  const filteredInsights = useMemo(() => {
    if (selectedDomain === "All") return insights;
    return insights.filter((item) => item.domain === selectedDomain);
  }, [insights, selectedDomain]);

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => {
            const isActive = selectedDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{filteredInsights.length}</strong> insights
        </span>
      </div>

      {/* 2-Column Grid of Contributor Cards */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-800">No insights found under &quot;{selectedDomain}&quot;.</p>
          <button
            onClick={() => setSelectedDomain("All")}
            className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
          >
            Show all categories
          </button>
        </div>
      )}
    </div>
  );
}
