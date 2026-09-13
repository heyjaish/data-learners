import InsightsFeed from "@/components/InsightsFeed";
import { initialInsights } from "@/lib/initialData";
import { siteConfig } from "@/lib/config";
import { Sparkles, PlusCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Sleek, Minimalist Page Header */}
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Data Learners Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Curated Community Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct advice and guidance from working Data Analysts, Data Scientists, and Data Engineers to help freshers understand what to do and how to do it.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <InsightsFeed initialData={initialInsights} />

      </div>
    </div>
  );
}
