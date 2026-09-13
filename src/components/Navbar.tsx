"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MessageSquare, Disc as DiscordIcon, PlusCircle, BookOpen, Compass } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
              <span className="text-lg">D</span>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Data Learners
              </span>
              <span className="hidden font-medium text-xs text-blue-600 sm:inline-block sm:ml-2 border-l border-slate-200 sm:pl-2">
                Community Insights
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-slate-400" />
            Insights & Guides
          </Link>
          <Link href="/#tracks" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-slate-400" />
            Career Tracks
          </Link>
          <Link href="/submit" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
            <PlusCircle className="h-4 w-4 text-slate-400" />
            Share Advice
          </Link>
        </nav>

        {/* Action Buttons: Community & Submit */}
        <div className="flex items-center gap-2.5">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Join WhatsApp Group"
            className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition-all hover:bg-emerald-100 hover:border-emerald-300"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a
            href={siteConfig.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Join Discord Community"
            className="inline-flex items-center gap-1.5 rounded-md border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-800 transition-all hover:bg-indigo-100 hover:border-indigo-300"
          >
            <DiscordIcon className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Discord</span>
          </a>

          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Post Insight</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
