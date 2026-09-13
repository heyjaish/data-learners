import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { MessageSquare, Disc as DiscordIcon, Heart, ArrowUpRight, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 font-bold text-white text-sm">
                D
              </div>
              <span className="font-bold text-slate-900">{siteConfig.communityName}</span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-xs text-slate-400">
              Built for beginners and freshers to learn what to do, what to avoid, and how to break into Data Analytics, Data Science, and Data Engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Explore Tracks
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/?domain=Data+Analyst" className="hover:text-blue-600 transition-colors">
                  Data Analyst Guidance
                </Link>
              </li>
              <li>
                <Link href="/?domain=Data+Scientist" className="hover:text-blue-600 transition-colors">
                  Data Scientist Roadmap
                </Link>
              </li>
              <li>
                <Link href="/?domain=Data+Engineer" className="hover:text-blue-600 transition-colors">
                  Data Engineering Insights
                </Link>
              </li>
              <li>
                <Link href="/?domain=BI+%26+Analytics" className="hover:text-blue-600 transition-colors">
                  Business Intelligence & Storytelling
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Contribute */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Join & Contribute
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  WhatsApp Group
                  <ArrowUpRight className="h-3 w-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors"
                >
                  <DiscordIcon className="h-4 w-4 text-indigo-600" />
                  Discord Community
                  <ArrowUpRight className="h-3 w-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium text-blue-600"
                >
                  Share Your Experience
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.communityName}. Open community project for data learners.</p>
          <div className="flex items-center gap-1">
            <span>Curated with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for aspiring data professionals.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
