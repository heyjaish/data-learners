"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Domain, InsightItem } from "@/lib/types";
import { saveLocalInsight } from "@/lib/storage";
import {
  ArrowLeft,
  Send,
  Sparkles,
  Check,
  User,
  FileText
} from "lucide-react";

export default function SubmitInsightPage() {
  const router = useRouter();

  // Form State - only Name and Content are mandatory
  const [contributorName, setContributorName] = useState("");
  const [contributorRole, setContributorRole] = useState("");
  const [company, setCompany] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [domain, setDomain] = useState<Exclude<Domain, "All">>("Data Analyst");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contributorName.trim()) {
      alert("Please enter the Contributor's Name.");
      return;
    }
    if (!content.trim()) {
      alert("Please paste or write the Advice content.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Auto-derive clean title if not provided
      let derivedTitle = title.trim();
      if (!derivedTitle) {
        const firstLine = content.trim().split("\n")[0].replace(/^[*#\d.\s]+/, "").trim();
        derivedTitle = firstLine.length > 5 && firstLine.length < 90
          ? firstLine
          : `Career Advice & Guidance for ${domain}`;
      }

      // Auto-derive clean summary if not provided
      const derivedSummary = summary.trim() || (content.trim().slice(0, 150).replace(/[*#]/g, "") + "...");

      const slug = (contributorName + "-" + domain)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);

      const newInsight: InsightItem = {
        id: slug,
        contributorName: contributorName.trim(),
        contributorRole: contributorRole.trim() || `${domain} Professional`,
        company: company.trim() || "Tech Industry",
        experienceYears: experienceYears.trim() || "Experienced",
        linkedinUrl: linkedinUrl.trim() || undefined,
        domain: domain,
        title: derivedTitle,
        summary: derivedSummary,
        content: content.trim(),
        createdAt: new Date().toISOString().split("T")[0],
        readTime: `${Math.max(2, Math.ceil(content.split(/\s+/).length / 180))} min read`,
        upvotes: 0,
        comments: []
      };

      await saveLocalInsight(newInsight);

      setSuccessMessage(true);
      setTimeout(() => {
        router.push(`/insights/${slug}`);
      }, 700);
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      alert("Something went wrong while saving. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200/80 pb-4 sm:pb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-blue-700 mb-2.5">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600 shrink-0" />
            <span>Community Contribution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Post Contributor Advice
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Paste the suggestions or message received from a working professional. It will immediately appear on the community grid.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 flex items-center gap-3">
            <Check className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Published Successfully!</p>
              <p className="text-xs text-emerald-700">Opening the article page...</p>
            </div>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
          
          {/* Contributor Profile */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="h-4 w-4 text-blue-600" />
              Contributor Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Only Name has mandatory red star */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Role / Title <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Data Analyst"
                  value={contributorRole}
                  onChange={(e) => setContributorRole(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Swiggy / Fintech / MNC"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Experience <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4+ Years"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Domain Track - clean selector without asterisk */}
          <div className="space-y-2 sm:space-y-3 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Domain Track
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["Data Analyst", "Data Scientist", "Data Engineer", "BI & Analytics"] as const).map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`rounded-lg border p-2 text-xs font-semibold text-center transition-all ${
                    domain === d
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Short Preview - Both completely optional */}
          <div className="space-y-3 sm:space-y-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Advice Headline / Title <span className="text-slate-400 font-normal">(Optional - auto-generated if left blank)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Practical Roadmap for Data Analytics Freshers in 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Preview <span className="text-slate-400 font-normal">(Optional - auto-extracted from content if left blank)</span>
              </label>
              <input
                type="text"
                placeholder="Quick 1-sentence summary of the main takeaway..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-base sm:text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Full Long-Form Advice (Mandatory) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                Full Written Advice / Suggestions <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Supports **bold**, bullet points, numbered lists</span>
            </div>
            <textarea
              required
              rows={11}
              placeholder={`Paste the advice or suggestions here.\n\nTips:\n- Use **double stars** for **bold headings**\n- Use numbers (1., 2.) or hyphens (-) for lists`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3.5 sm:p-4 text-base sm:text-sm text-slate-900 leading-relaxed placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm font-sans"
            />
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] sm:text-xs text-slate-500 order-2 sm:order-1 text-center sm:text-left">
              Will immediately appear on the home page grid.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Publishing..." : "Publish Advice"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
