import HeroSection from "@/components/HeroSection";
import InsightsFeed from "@/components/InsightsFeed";
import { initialInsights } from "@/lib/initialData";
import { siteConfig } from "@/lib/config";
import { MessageSquare, Disc as DiscordIcon, ArrowRight, BookOpen, Users, Compass } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <HeroSection />

      {/* Main Insights Directory & Filter */}
      <InsightsFeed initialData={initialInsights} />

      {/* Community Connection Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Join The Conversation
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Have doubts about SQL, projects, or your resume?
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Our WhatsApp and Discord community groups are active with hundreds of freshers and working professionals. Ask your questions, get your portfolio reviewed, and stay updated with new insights.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Join WhatsApp Group
              </a>

              <a
                href={siteConfig.discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <DiscordIcon className="h-4 w-4" />
                Join Discord Server
              </a>

              <Link
                href="/submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>Share An Insight</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
