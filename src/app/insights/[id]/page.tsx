"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { InsightItem } from "@/lib/types";
import { getInsightById } from "@/lib/storage";
import { siteConfig } from "@/lib/config";
import {
  ArrowLeft,
  Clock,
  Building2,
  Briefcase,
  Share2,
  MessageSquare,
  ExternalLink,
  Check
} from "lucide-react";

export default function InsightDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [insight, setInsight] = useState<InsightItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    const item = getInsightById(id);
    if (item) {
      setInsight(item);
    } else {
      setInsight(null);
    }
  }, [id]);

  if (!insight) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Insight not found</h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          The requested guide or contributor advice could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all insights
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
    `Read career advice from ${insight.contributorName} (${insight.contributorRole}) on Data Learners:\n${typeof window !== "undefined" ? window.location.href : ""}`
  )}`;

  const initials = insight.contributorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Navigation & Share Link */}
        <div className="flex items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-3 sm:pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All insights</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-500" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              <span>Share</span>
            </a>
          </div>
        </div>

        {/* Contributor Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-base sm:text-lg shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {insight.contributorName}
                </h2>
                {insight.linkedinUrl && (
                  <a
                    href={insight.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors p-0.5"
                    title="LinkedIn Profile"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-slate-400 shrink-0" />
                  {insight.contributorRole}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                  {insight.company}
                </span>
              </div>
            </div>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            {insight.domain}
          </span>
        </div>

        {/* Article Headline */}
        <div className="space-y-2 pt-1">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug sm:leading-tight">
            {insight.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Clock className="h-3.5 w-3.5" />
            <span>{insight.readTime || "4 min read"}</span>
            <span>•</span>
            <span>Data Learners Community</span>
          </div>
        </div>

        {/* Quick Summary Callout */}
        {insight.summary && (
          <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/50 p-3.5 sm:p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            &ldquo;{insight.summary}&rdquo;
          </div>
        )}

        {/* Full Long-Form Content (ChatGPT / Article Style) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-9 shadow-sm">
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {insight.content}
          </div>
        </div>

        {/* Bottom Banner - Mobile friendly */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Have questions for our working professionals?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Join the conversation with beginners and seniors on WhatsApp.</p>
          </div>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors shrink-0"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Join WhatsApp</span>
          </a>
        </div>

      </article>
    </div>
  );
}
