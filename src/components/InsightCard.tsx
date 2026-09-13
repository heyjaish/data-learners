import Link from "next/link";
import { InsightItem } from "@/lib/types";
import { ArrowRight, Clock, Building2, Briefcase, ExternalLink } from "lucide-react";

interface InsightCardProps {
  insight: InsightItem;
}

const domainBadgeStyles: Record<string, string> = {
  "Data Analyst": "bg-blue-50 text-blue-700 border-blue-200/80",
  "Data Scientist": "bg-purple-50 text-purple-700 border-purple-200/80",
  "Data Engineer": "bg-amber-50 text-amber-800 border-amber-200/80",
  "BI & Analytics": "bg-teal-50 text-teal-800 border-teal-200/80",
  "Machine Learning": "bg-indigo-50 text-indigo-700 border-indigo-200/80",
};

const avatarColors = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-indigo-600",
  "bg-teal-600",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export default function InsightCard({ insight }: InsightCardProps) {
  const badgeStyle = domainBadgeStyles[insight.domain] || "bg-slate-100 text-slate-700 border-slate-200";
  const avatarColor = getAvatarColor(insight.contributorName);
  const initials = insight.contributorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-slate-300/90 transition-all duration-200">
      <div>
        {/* Contributor Profile Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-white text-sm ${avatarColor} shadow-sm ring-2 ring-white`}>
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {insight.contributorName}
                </h3>
                {insight.linkedinUrl && (
                  <a
                    href={insight.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-slate-400" />
                  {insight.contributorRole}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Building2 className="h-3 w-3 text-slate-400" />
                  {insight.company}
                </span>
              </div>
            </div>
          </div>

          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${badgeStyle}`}>
            {insight.domain}
          </span>
        </div>

        {/* Title & Preview */}
        <div className="mt-5">
          <Link href={`/insights/${insight.id}`}>
            <h4 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
              {insight.title}
            </h4>
          </Link>
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {insight.summary || insight.content.slice(0, 160) + "..."}
          </p>
        </div>
      </div>

      {/* Footer / Read Advice Action */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
          <Clock className="h-3.5 w-3.5" />
          <span>{insight.readTime || "4 min read"}</span>
        </div>

        <Link
          href={`/insights/${insight.id}`}
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read Advice</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
