import Link from "next/link";
import { initialInsights } from "@/lib/initialData";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Briefcase,
  ExternalLink,
  Award,
  BookOpen,
  Share2
} from "lucide-react";

export default function Home() {
  // Rahul Sharma's insight
  const rahulInsight = initialInsights.find((i) => i.contributorName.includes("Rahul")) || initialInsights[0];

  const initials = "RS";

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Heading requested by user */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Curated communities insights by Rahul Sharma
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Practical guidance, roadmap, and dos & don&apos;ts for freshers breaking into Data Analytics.
          </p>
        </div>

        {/* Rahul Sharma's Comprehensive & Clean Guide Card */}
        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">
          {/* Header Profile */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-lg shadow-sm">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {rahulInsight.contributorName}
                  </h2>
                  {rahulInsight.linkedinUrl && (
                    <a
                      href={rahulInsight.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    {rahulInsight.contributorRole}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {rahulInsight.company}
                  </span>
                  <span>•</span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {rahulInsight.experienceYears}
                  </span>
                </div>
              </div>
            </div>

            <span className="self-start inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
              {rahulInsight.domain}
            </span>
          </div>

          {/* Article Title & Summary */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 leading-snug">
              {rahulInsight.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {rahulInsight.summary}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{rahulInsight.readTime}</span>
            </div>
          </div>

          {/* Side-by-Side Dos & Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* The DOs */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base pb-3 border-b border-emerald-200/80">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>What You MUST Do (The Do&apos;s)</span>
              </div>
              <ul className="mt-4 space-y-3">
                {rahulInsight.theDos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The DONTs */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm sm:text-base pb-3 border-b border-rose-200/80">
                <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <span>What You Must AVOID (The Don&apos;ts)</span>
              </div>
              <ul className="mt-4 space-y-3">
                {rahulInsight.theDonts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-800 font-mono text-[11px] font-bold">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Tools & Tech Stack */}
          {rahulInsight.recommendedTools && rahulInsight.recommendedTools.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Award className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Recommended Tools & Priorities</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {rahulInsight.recommendedTools.map((tool, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-between gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{tool.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {tool.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{tool.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Advice */}
          {rahulInsight.interviewAdvice && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5 space-y-2">
              <h4 className="text-sm font-bold text-blue-900 flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-blue-600" />
                Interview & Resume Advice
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {rahulInsight.interviewAdvice}
              </p>
            </div>
          )}

          {/* Full Story & Guidance */}
          {rahulInsight.fullStory && (
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-slate-700" />
                Full Experience & Roadmap
              </h4>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {rahulInsight.fullStory}
              </div>
            </div>
          )}
        </article>

      </div>
    </div>
  );
}
