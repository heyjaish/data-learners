"use client";

import Link from "next/link";
import { PlusCircle, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm text-sm">
            D
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            Data Learners
          </span>
        </Link>

        {/* Minimal Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>Share Insight</span>
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
