"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_CREDENTIALS, isAdminAuthenticated, setAdminAuthenticated } from "@/lib/auth";
import { ShieldCheck, Lock, User, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(ADMIN_CREDENTIALS.username);
  const [password, setPassword] = useState(ADMIN_CREDENTIALS.password);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isMatch =
      (username.trim() === ADMIN_CREDENTIALS.username || username.trim() === ADMIN_CREDENTIALS.email) &&
      password === ADMIN_CREDENTIALS.password;

    if (isMatch) {
      setAdminAuthenticated(true);
      router.push("/admin");
    } else {
      setError("Invalid username or password. Please use the hardcoded credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6 justify-center w-full"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Public Website
        </Link>

        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
            <ShieldCheck className="h-6 w-6 text-blue-400" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl font-extrabold text-slate-900">
          Admin Portal Login
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Sign in to manage and moderate community insights
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          {/* Hardcoded Credentials Notice Box */}
          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <KeyRound className="h-3.5 w-3.5 text-blue-600" />
              Hardcoded Credentials:
            </div>
            <p>
              Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-slate-800 border">admin</code>
            </p>
            <p>
              Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-slate-800 border">adminpassword123</code>
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              Sign In to Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
