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
  Clock,
  Building2,
  Briefcase,
  Share2,
  MessageSquare,
  ExternalLink,
  Check,
  BookOpen
} from "lucide-react";

export default function InsightDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [insight, setInsight] = useState<InsightItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    const item = getInsightById(id) || initialInsights.find((i) => i.id === id);
    if (item) {
      setInsight(item);
    }
  }, [id]);

  if (!insight) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Insight not found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested guide or contributor advice could not be found.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
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
    `Read advice from ${insight.contributorName} (${insight.contributorRole}) on Data Learners:\n${typeof window !== "undefined" ? window.location.href : ""}`
  )}`;

  const initials = insight.contributorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation & Share Link */}
        <div className="flex items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all insights
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
              Share
            </a>
          </div>
        </div>

        {/* Contributor Profile Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-lg shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {insight.contributorName}
                </h2>
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
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                  {insight.contributorRole}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  {insight.company}
                </span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
            {insight.domain}
          </span>
        </div>

        {/* Article Headline */}
        <div className="space-y-3 pt-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {insight.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {insight.readTime || "4 min read"}
            </span>
            <span>•</span>
            <span>Data Learners Community</span>
          </div>
        </div>

        {/* Quick Summary Callout */}
        {insight.summary && (
          <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/50 p-4 sm:p-5 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            &ldquo;{insight.summary}&rdquo;
          </div>
        )}

        {/* Full Long-Form Content (ChatGPT / Article Style) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {insight.content}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Have questions for our working professionals?</h3>
            <p className="text-xs text-slate-500 mt-0.5">Join the conversation with beginners and seniors on WhatsApp.</p>
          </div>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors shrink-0"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Join WhatsApp
          </a>
        </div>

      </article>
    </div>
  );
}
