import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} {siteConfig.communityName}. Open community knowledge base for data learners.</p>
        <div className="flex items-center gap-3">
          <Link href="/admin/login" className="hover:text-slate-900 transition-colors">
            Admin Login
          </Link>
          <span>•</span>
          <Link href="/submit" className="hover:text-slate-900 transition-colors">
            Post Insight
          </Link>
        </div>
      </div>
    </footer>
  );
}
