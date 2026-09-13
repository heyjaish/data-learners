import InsightsFeed from "@/components/InsightsFeed";
import { initialInsights } from "@/lib/initialData";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="py-6 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Sleek, Minimalist Page Header */}
        <div className="max-w-2xl space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-blue-700">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600 shrink-0" />
            <span>Data Learners Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Curated Community Insights
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Direct advice and guidance from working Data Analysts, Data Scientists, and Data Engineers to help freshers understand what to do and how to do it.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <InsightsFeed initialData={initialInsights} />

      </div>
    </div>
  );
}
