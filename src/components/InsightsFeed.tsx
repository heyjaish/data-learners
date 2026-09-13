"use client";

import { useState, useEffect, useMemo } from "react";
import { Domain, InsightItem } from "@/lib/types";
import { getLocalInsights } from "@/lib/storage";
import FilterBar from "./FilterBar";
import InsightCard from "./InsightCard";
import Link from "next/link";
import { Sparkles, PlusCircle } from "lucide-react";

interface InsightsFeedProps {
  initialData?: InsightItem[];
}

export default function InsightsFeed({ initialData = [] }: InsightsFeedProps) {
  const [insights, setInsights] = useState<InsightItem[]>(initialData);
  const [selectedDomain, setSelectedDomain] = useState<Domain>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const local = getLocalInsights();
    if (local && local.length > 0) {
      setInsights(local);
    }
  }, []);

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      // Domain filter
      const matchesDomain = selectedDomain === "All" || item.domain === selectedDomain;
      if (!matchesDomain) return false;

      // Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.contributorName.toLowerCase().includes(q) ||
        item.contributorRole.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.theDos.some((d) => d.toLowerCase().includes(q)) ||
        item.theDonts.some((d) => d.toLowerCase().includes(q)) ||
        item.recommendedTools.some((t) => t.name.toLowerCase().includes(q))
      );
    });
  }, [insights, selectedDomain, searchQuery]);

  return (
    <section id="insights-grid" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Curated Community Insights
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Browse battle-tested career advice, dos and don&apos;ts, and step-by-step guidance from senior peers.
            </p>
          </div>

          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 border border-blue-200/80 hover:bg-blue-100/80 transition-colors self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4 text-blue-600" />
            <span>Are you a working professional? Share advice</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <FilterBar
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredInsights.length}
        />

        {/* Cards Grid */}
        {filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">No matching insights found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any guides matching &quot;{searchQuery}&quot; under &quot;{selectedDomain}&quot;. Try adjusting your search keywords or clear filters.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedDomain("All");
                  setSearchQuery("");
                }}
                className="rounded-md bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                Clear all filters
              </button>
              <Link
                href="/submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
              >
                Add this insight
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
