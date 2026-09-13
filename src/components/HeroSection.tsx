import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowRight, CheckCircle2, XCircle, Sparkles, MessageSquare } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative border-b border-slate-200 bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Subtle Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1 text-xs font-medium text-blue-700 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Community Knowledge Base • WhatsApp & Discord Group</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
            Real advice from working data professionals.{" "}
            <span className="text-blue-600 block sm:inline">No fluff, no sales pitch.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical insights from working <strong>Data Analysts</strong>, <strong>Data Scientists</strong>, and <strong>Data Engineers</strong> to help beginners and freshers learn what to do, what mistakes to avoid, and which tools actually matter.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#insights-grid"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Explore Insights
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]"
            >
              Share Your Experience
            </Link>

            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-all hover:bg-emerald-100"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              Join WhatsApp Group
            </a>
          </div>

          {/* Key Value Points */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100 text-left">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">The Do&apos;s</h4>
                <p className="text-xs text-slate-600 mt-0.5">High-ROI skills, real SQL techniques, and business acumen.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">The Don&apos;ts</h4>
                <p className="text-xs text-slate-600 mt-0.5">Avoid tutorial traps, generic Titanic projects, and tool overload.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="h-5 w-5 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                💡
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Actionable Roadmaps</h4>
                <p className="text-xs text-slate-600 mt-0.5">Clear preparation paths vetted by active hiring practitioners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
