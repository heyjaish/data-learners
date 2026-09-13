"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { InsightItem } from "@/lib/types";
import { getInsightById } from "@/lib/storage";
import { initialInsights } from "@/lib/initialData";
import { siteConfig } from "@/lib/config";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Briefcase,
  Share2,
  MessageSquare,
  Disc as DiscordIcon,
  ExternalLink,
  Check,
  Award,
  BookOpen
} from "lucide-react";

export default function InsightDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [insight, setInsight] = useState<InsightItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Check client storage first, fallback to initial dataset
    const item = getInsightById(id) || initialInsights.find((i) => i.id === id);
    if (item) {
      setInsight(item);
    }
  }, [id]);

  if (!insight) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Insight not found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested guide or contributor profile could not be located.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all guides
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Read "${insight.title}" by ${insight.contributorName} (${insight.contributorRole}) on Data Learners:\n${typeof window !== "undefined" ? window.location.href : ""}`
  )}`;

  const initials = insight.contributorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Navigation & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all guides
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              Share to WhatsApp
            </a>
          </div>
        </div>

        {/* Contributor Card & Article Header */}
        <header className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-lg shadow-sm">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {insight.contributorName}
                  </h1>
                  {insight.linkedinUrl && (
                    <a
                      href={insight.linkedinUrl}
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
                    {insight.contributorRole}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {insight.company}
                  </span>
                  <span>•</span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {insight.experienceYears}
                  </span>
                </div>
              </div>
            </div>

            <span className="self-start inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
              {insight.domain}
            </span>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {insight.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {insight.summary}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {insight.readTime || "5 min read"}
              </span>
              <span>•</span>
              <span>Published for Data Learners Community</span>
            </div>
          </div>
        </header>

        {/* Section 1: The Dos & Don'ts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The DOs */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base pb-3 border-b border-emerald-200/80">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>What You MUST Do (The Do&apos;s)</span>
            </div>
            <ul className="mt-4 space-y-3">
              {insight.theDos.map((item, idx) => (
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
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base pb-3 border-b border-rose-200/80">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
              <span>What You Must AVOID (The Don&apos;ts)</span>
            </div>
            <ul className="mt-4 space-y-3">
              {insight.theDonts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-800 font-mono text-[11px] font-bold">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Recommended Tools & Stack */}
        {insight.recommendedTools && insight.recommendedTools.length > 0 && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Award className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Recommended Tools & Tech Stack</h3>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {insight.recommendedTools.map((tool, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-slate-900">{tool.name}</span>
                    <p className="text-xs text-slate-600">{tool.note}</p>
                  </div>
                  <span
                    className={`self-start sm:self-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      tool.level === "Essential"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : tool.level === "Good to Have"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {tool.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Interview & Resume Advice */}
        {insight.interviewAdvice && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Interview & Portfolio Advice</h3>
            </div>
            <div className="mt-4 text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {insight.interviewAdvice}
            </div>
          </section>
        )}

        {/* Section 4: Full Story & Deep Dive */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <BookOpen className="h-5 w-5 text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Full Experience & Advice</h3>
          </div>
          <div className="mt-6 prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {insight.fullStory}
          </div>
        </section>

        {/* Bottom Banner: Ask questions in community */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Have questions about this guide?</h4>
            <p className="text-xs text-slate-600 mt-1">
              Join the Data Learners WhatsApp or Discord group to discuss directly with working professionals and peers.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp Group
            </a>
            <a
              href={siteConfig.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm"
            >
              <DiscordIcon className="h-3.5 w-3.5" />
              Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
