"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InsightItem } from "@/lib/types";
import { getLocalInsights, deleteLocalInsight } from "@/lib/storage";
import { isAdminAuthenticated, setAdminAuthenticated } from "@/lib/auth";
import {
  ShieldCheck,
  LogOut,
  PlusCircle,
  ExternalLink,
  Trash2,
  BookOpen,
  ArrowLeft,
  Check
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedNotification, setDeletedNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setInsights(getLocalInsights());
    setLoading(false);

    // Listen for any storage updates
    const handleStorageUpdate = () => {
      setInsights(getLocalInsights());
    };
    window.addEventListener("data-learners-storage-updated", handleStorageUpdate);
    return () => {
      window.removeEventListener("data-learners-storage-updated", handleStorageUpdate);
    };
  }, [router]);

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push("/");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete the guide by "${name}"?`)) {
      // Optimistic update
      setInsights((prev) => prev.filter((item) => item.id !== id));
      // Permanent storage deletion
      const updated = deleteLocalInsight(id);
      setInsights(updated);

      setDeletedNotification(`Deleted "${name}" successfully.`);
      setTimeout(() => setDeletedNotification(null), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs text-slate-500 font-medium">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Admin Management Portal</h1>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Active Session
                </span>
              </div>
              <p className="text-xs text-slate-500">Manage, review, and delete community submissions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              View Site
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add New
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 shadow-sm transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Deleted Success Banner */}
        {deletedNotification && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span>{deletedNotification}</span>
          </div>
        )}

        {/* Stats Row with Crisp Typography */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Guides</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{insights.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Analysts</span>
            <p className="text-2xl font-black text-blue-600 mt-1">
              {insights.filter((i) => i.domain === "Data Analyst").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Scientists</span>
            <p className="text-2xl font-black text-purple-600 mt-1">
              {insights.filter((i) => i.domain === "Data Scientist").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Engineers</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {insights.filter((i) => i.domain === "Data Engineer").length}
            </p>
          </div>
        </div>

        {/* Manage Table */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              All Guides & Contributor Insights
            </h2>
            <span className="text-xs text-slate-500 font-medium">{insights.length} total entries</span>
          </div>

          {insights.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Contributor</th>
                    <th className="py-3 px-4">Role & Company</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Title / Headline</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {insights.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {item.contributorName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="font-medium text-slate-800">{item.contributorRole}</div>
                        <div className="text-[11px] text-slate-400">{item.company}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 font-semibold text-slate-700 text-[11px]">
                          {item.domain}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-medium text-slate-800 truncate" title={item.title}>
                          {item.title}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <Link
                          href={`/insights/${item.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-100 font-semibold transition-colors"
                          title="View Live Guide"
                        >
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                          <span>View</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.contributorName)}
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-700 hover:bg-rose-100 font-semibold transition-colors active:scale-95"
                          title="Delete Permanently"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-slate-400 text-xs">
              No insights remaining in the system.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
