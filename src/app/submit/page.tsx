"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Domain, InsightItem } from "@/lib/types";
import { saveLocalInsight } from "@/lib/storage";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Send,
  Eye,
  Sparkles,
  Info,
  Check,
  Building2,
  Briefcase,
  User,
  ExternalLink
} from "lucide-react";

export default function SubmitInsightPage() {
  const router = useRouter();

  // Form State
  const [contributorName, setContributorName] = useState("");
  const [contributorRole, setContributorRole] = useState("");
  const [company, setCompany] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [domain, setDomain] = useState<Exclude<Domain, "All">>("Data Analyst");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [theDosText, setTheDosText] = useState("");
  const [theDontsText, setTheDontsText] = useState("");
  const [toolsText, setToolsText] = useState("");
  const [interviewAdvice, setInterviewAdvice] = useState("");
  const [fullStory, setFullStory] = useState("");

  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Parse multiline lists
  const parseLines = (text: string) =>
    text
      .split("\n")
      .map((line) => line.trim().replace(/^[-*•\d.]+\s*/, ""))
      .filter((line) => line.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contributorName.trim() || !title.trim() || !summary.trim()) {
      alert("Please fill in the Name, Title, and Summary to submit.");
      return;
    }

    setIsSubmitting(true);

    const dos = parseLines(theDosText);
    const donts = parseLines(theDontsText);
    const parsedTools = parseLines(toolsText).map((t) => ({
      name: t,
      level: "Essential" as const,
      note: "Recommended by contributor"
    }));

    // Generate unique slug id
    const slug = (contributorName + "-" + domain)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now().toString().slice(-4);

    const newInsight: InsightItem = {
      id: slug,
      contributorName: contributorName.trim(),
      contributorRole: contributorRole.trim() || "Working Professional",
      company: company.trim() || "Tech Industry",
      experienceYears: experienceYears.trim() || "3+ Years",
      linkedinUrl: linkedinUrl.trim() || undefined,
      domain: domain,
      title: title.trim(),
      summary: summary.trim(),
      theDos: dos.length > 0 ? dos : ["Focus on core fundamentals and consistency."],
      theDonts: donts.length > 0 ? donts : ["Avoid relying only on surface-level certificate courses."],
      recommendedTools: parsedTools.length > 0 ? parsedTools : [
        { name: "SQL", level: "Essential", note: "Crucial for everyday work" }
      ],
      interviewAdvice: interviewAdvice.trim() || "Focus on problem-solving intuition and business impact.",
      fullStory: fullStory.trim() || summary.trim(),
      createdAt: new Date().toISOString().split("T")[0],
      readTime: "4 min read"
    };

    saveLocalInsight(newInsight);

    setSuccessMessage(true);
    setTimeout(() => {
      router.push(`/insights/${slug}`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Community Knowledge Submission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Share Your Practical Insights
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Help freshers and beginners in our WhatsApp & Discord group learn the real skills, interview traps, and dos & don&apos;ts of the data industry.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800 flex items-center gap-3">
            <Check className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Insight Published Successfully!</p>
              <p className="text-xs text-emerald-700">Redirecting you to your published guide...</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">
          {/* Section 1: Contributor Profile */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="h-4 w-4 text-blue-600" />
              1. Your Profile (Working Professional Details)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Gupta"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Current Role / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Analyst / Senior Data Engineer"
                  value={contributorRole}
                  onChange={(e) => setContributorRole(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Industry
                </label>
                <input
                  type="text"
                  placeholder="e.g. E-Commerce / Fintech / IT MNC"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3.5 Years / 5+ Years"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Domain Track & Topic */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              2. Domain & Key Advice Topic
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Domain Track <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(["Data Analyst", "Data Scientist", "Data Engineer", "BI & Analytics", "Machine Learning"] as const).map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDomain(d)}
                    className={`rounded-lg border p-2.5 text-xs font-semibold text-center transition-all ${
                      domain === d
                        ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title / Core Headline <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. How I cracked an Analyst role without a CS degree"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Brief Summary (2-3 sentences) <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="A concise summary of your key message to freshers..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Section 3: The Dos & Don'ts */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              3. The Do&apos;s and Don&apos;ts (Enter one point per line)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4">
                <label className="block text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  What freshers MUST Do (1 per line)
                </label>
                <textarea
                  rows={5}
                  placeholder={`Master SQL window functions\nLearn how business metrics like CAC & LTV work\nBuild clean portfolio projects with real messy data`}
                  value={theDosText}
                  onChange={(e) => setTheDosText(e.target.value)}
                  className="w-full rounded-lg border border-emerald-200 bg-white p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4">
                <label className="block text-xs font-bold text-rose-800 mb-1 flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-rose-600" />
                  What freshers must AVOID (1 per line)
                </label>
                <textarea
                  rows={5}
                  placeholder={`Don't copy Titanic/Iris datasets from Kaggle\nDon't jump directly into AI before mastering SQL\nDon't apply with a generic 3-page resume`}
                  value={theDontsText}
                  onChange={(e) => setTheDontsText(e.target.value)}
                  className="w-full rounded-lg border border-rose-200 bg-white p-2.5 text-xs text-slate-800 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Recommended Tools & Interview Tips */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              4. Tools & Interview Preparation
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Essential Tools To Master (1 tool per line)
              </label>
              <textarea
                rows={2}
                placeholder="SQL (PostgreSQL / Snowflake)&#10;PowerBI or Tableau&#10;Python (Pandas)"
                value={toolsText}
                onChange={(e) => setToolsText(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Interview & Resume Advice
              </label>
              <textarea
                rows={3}
                placeholder="How to answer technical questions, explain projects, or highlight business impact..."
                value={interviewAdvice}
                onChange={(e) => setInterviewAdvice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Experience & Advice (Detailed Story)
              </label>
              <textarea
                rows={6}
                placeholder="Write your story, how you broke into tech, what you look for when interviewing candidates, and any final encouraging words..."
                value={fullStory}
                onChange={(e) => setFullStory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Your insight will be published immediately on the Data Learners platform.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Publishing..." : "Publish Insight"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
