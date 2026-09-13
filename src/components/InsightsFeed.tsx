"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Domain, InsightItem } from "@/lib/types";
import { getLocalInsights, fetchRemoteInsights } from "@/lib/storage";
import InsightCard from "./InsightCard";
import { Search, Sparkles, PlusCircle } from "lucide-react";

interface InsightsFeedProps {
  initialData?: InsightItem[];
}

const domains: Domain[] = [
  "All",
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "BI & Analytics",
  "Machine Learning"
];

type SortMode = "latest" | "popular";

export default function InsightsFeed({ initialData = [] }: InsightsFeedProps) {
  const [insights, setInsights] = useState<InsightItem[]>(initialData);
  const [selectedDomain, setSelectedDomain] = useState<Domain>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  useEffect(() => {
    setInsights(getLocalInsights());

    fetchRemoteInsights().then((remote) => {
      if (remote && remote.length > 0) {
        setInsights(remote);
      }
    });

    const handleStorageUpdate = () => {
      setInsights(getLocalInsights());
    };
    window.addEventListener("data-learners-storage-updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("data-learners-storage-updated", handleStorageUpdate);
    };
  }, []);

  const filteredAndSortedInsights = useMemo(() => {
    let result = [...insights];

    // Filter by domain
    if (selectedDomain !== "All") {
      result = result.filter((item) => item.domain === selectedDomain);
    }

    // Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.contributorName.toLowerCase().includes(q) ||
          item.contributorRole.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortMode === "popular") {
        const upvoteDiff = (b.upvotes || 0) - (a.upvotes || 0);
        if (upvoteDiff !== 0) return upvoteDiff;
      }
      const dateA = new Date(a.createdAt).getTime() || 0;
      const dateB = new Date(b.createdAt).getTime() || 0;
      return dateB - dateA;
    });

    return result;
  }, [insights, selectedDomain, searchQuery, sortMode]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Controls Bar: Search & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search guides, tools (SQL, Python), or mentors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
            <button
              onClick={() => setSortMode("latest")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                sortMode === "latest"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortMode("popular")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                sortMode === "popular"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Most Upvoted
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills - Mobile scroll friendly */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {domains.map((domain) => {
            const isActive = selectedDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 font-medium self-end sm:self-auto">
          Showing <strong className="text-slate-800">{filteredAndSortedInsights.length}</strong> guides
        </span>
      </div>

      {/* 2-Column Responsive Grid */}
      {filteredAndSortedInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredAndSortedInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            {searchQuery ? `No results found for "${searchQuery}"` : `No guides found under "${selectedDomain}".`}
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Be the first working professional to share your knowledge in this track!
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Clear search
              </button>
            ) : (
              <button
                onClick={() => setSelectedDomain("All")}
                className="text-xs font-semibold text-slate-600 hover:underline"
              >
                View all categories
              </button>
            )}
            <Link
              href="/submit"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Share Insight</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
