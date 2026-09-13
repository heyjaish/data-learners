"use client";

import Link from "next/link";
import { PlusCircle, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-slate-900 font-bold text-white shadow-sm text-xs sm:text-sm tracking-wider">
            DL
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 leading-none">
              Data Learners
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 mt-0.5">
              Working Professionals Insights
            </span>
          </div>
        </Link>

        {/* Right CTA Actions - Touch-friendly on mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="hidden xs:inline sm:inline">WhatsApp</span>
          </a>

          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5 shrink-0" />
            <span>Share Insight</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
