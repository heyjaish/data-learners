import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Data Learners | Practical Career Advice from Working Data Professionals",
  description: "Real-world career guidance, dos and don'ts, roadmaps, and interview tips from working Data Analysts, Data Scientists, and Data Engineers. Free community project for beginners.",
  keywords: [
    "Data Analytics",
    "Data Science",
    "Data Engineering",
    "Career Roadmaps",
    "SQL",
    "Python",
    "PowerBI",
    "Data Learners Community"
  ],
  openGraph: {
    title: "Data Learners | Practical Career Advice for Aspiring Data Pros",
    description: "Curated insights, dos & don'ts, and roadmaps directly from working professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
