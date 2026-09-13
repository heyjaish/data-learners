import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 font-bold text-white text-[10px]">
            DL
          </div>
          <p>© {new Date().getFullYear()} {siteConfig.communityName}. Open community knowledge base for data learners.</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Insights Feed
          </Link>
          <span>•</span>
          <Link href="/submit" className="hover:text-blue-600 transition-colors">
            Share Advice
          </Link>
          <span>•</span>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
