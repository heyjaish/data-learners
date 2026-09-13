import { Domain } from "@/lib/types";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  selectedDomain: Domain;
  onSelectDomain: (domain: Domain) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

const domains: Domain[] = [
  "All",
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "BI & Analytics",
  "Machine Learning"
];

export default function FilterBar({
  selectedDomain,
  onSelectDomain,
  searchQuery,
  onSearchChange,
  totalCount,
}: FilterBarProps) {
  return (
    <div id="tracks" className="space-y-4">
      {/* Top row: Search input & count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by topic, skill (SQL, Python, PowerBI), or author..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium self-end sm:self-center">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
          <span>Showing <strong className="text-slate-800">{totalCount}</strong> guides</span>
        </div>
      </div>

      {/* Tabs row: Domain categories */}
      <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-200 pb-3">
        {domains.map((domain) => {
          const isActive = selectedDomain === domain;
          return (
            <button
              key={domain}
              onClick={() => onSelectDomain(domain)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {domain}
            </button>
          );
        })}
      </div>
    </div>
  );
}
