-- Data Learners Supabase Schema
-- Run this in your Supabase SQL Editor if creating tables manually

CREATE TABLE IF NOT EXISTS public.insights (
  id TEXT PRIMARY KEY,
  contributor_name TEXT NOT NULL,
  contributor_role TEXT NOT NULL DEFAULT 'Working Professional',
  company TEXT NOT NULL DEFAULT 'Tech & Analytics',
  experience_years TEXT NOT NULL DEFAULT 'Fresher / Analyst',
  linkedin_url TEXT,
  domain TEXT NOT NULL DEFAULT 'Data Analyst',
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '3 min read',
  upvotes INTEGER NOT NULL DEFAULT 1,
  comments JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all insights
CREATE POLICY "Public read insights"
  ON public.insights
  FOR SELECT
  USING (true);

-- Allow public insert (community submissions)
CREATE POLICY "Public insert insights"
  ON public.insights
  FOR INSERT
  WITH CHECK (true);

-- Allow public update (for upvoting and adding comments)
CREATE POLICY "Public update insights"
  ON public.insights
  FOR UPDATE
  USING (true);

-- Allow deletion (for admin deletion)
CREATE POLICY "Public delete insights"
  ON public.insights
  FOR DELETE
  USING (true);
