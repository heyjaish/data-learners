"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { InsightItem, CommentItem } from "@/lib/types";
import { getInsightById, upvoteLocalInsight, addCommentToInsight, fetchRemoteInsights } from "@/lib/storage";
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
  ArrowBigUp,
  Send,
  User
} from "lucide-react";

export default function InsightDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [insight, setInsight] = useState<InsightItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [upvotes, setUpvotes] = useState(1);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Comment form state
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (!id) return;
    const item = getInsightById(id);
    if (item) {
      setInsight(item);
      setUpvotes(item.upvotes || 1);
    }
    // Always sync latest upvotes/comments from remote Supabase
    fetchRemoteInsights().then((remote) => {
      const found = remote.find((r) => r.id === id);
      if (found) {
        setInsight(found);
        setUpvotes(found.upvotes || 1);
      }
    });
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

  const handleUpvote = () => {
    const newCount = upvoteLocalInsight(insight.id);
    setUpvotes(newCount);
    setHasUpvoted(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    const updatedComments = addCommentToInsight(
      insight.id,
      commentAuthor.trim() || "Community Learner",
      commentText.trim()
    );

    setInsight((prev) => (prev ? { ...prev, comments: updatedComments } : prev));
    setCommentText("");
    setIsSubmittingComment(false);
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
        
        {/* Top Navigation, Upvote & Share Bar */}
        <div className="flex items-center justify-between gap-3 text-xs border-b border-slate-200/80 pb-3 sm:pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All insights</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Reddit-style Upvote Button */}
            <button
              onClick={handleUpvote}
              title="Upvote / Highlight this guide"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold border transition-all active:scale-95 ${
                hasUpvoted
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              <ArrowBigUp className={`h-4 w-4 ${hasUpvoted ? "fill-amber-500 text-amber-600" : ""}`} />
              <span>Upvote {upvotes}</span>
            </button>

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
                <span>•</span>
                <span className="font-medium text-slate-500">
                  {insight.experienceYears}
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

        {/* Full Long-Form Content with Markdown & Bold parsing */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-9 shadow-sm">
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-5 mb-2.5" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 text-slate-800 leading-relaxed" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                em: ({ node, ...props }) => <em className="italic text-slate-800" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
                li: ({ node, ...props }) => <li className="text-slate-800 leading-relaxed" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4" {...props} />,
                code: ({ node, ...props }) => <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs" {...props} />,
              }}
            >
              {insight.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Community Comments Section at the Bottom */}
        <section id="comments" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span>Discussion & Comments ({insight.comments?.length || 0})</span>
            </h3>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="Ask a question or share your thoughts on this advice..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          {insight.comments && insight.comments.length > 0 ? (
            <div className="space-y-3 pt-2">
              {insight.comments.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {c.author}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.createdAt}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-0.5">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </section>

        {/* Bottom WhatsApp Group Banner */}
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
