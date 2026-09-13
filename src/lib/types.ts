export type Domain = 
  | 'All'
  | 'Data Analyst'
  | 'Data Scientist'
  | 'Data Engineer'
  | 'BI & Analytics'
  | 'Machine Learning';

export interface InsightItem {
  id: string;
  contributorName: string;
  contributorRole: string;
  company: string;
  experienceYears: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatarUrl?: string;
  domain: Exclude<Domain, 'All'>;
  title: string;
  summary: string;
  theDos: string[];
  theDonts: string[];
  recommendedTools: { name: string; level: 'Essential' | 'Good to Have' | 'Optional'; note: string }[];
  interviewAdvice: string;
  fullStory: string;
  createdAt: string;
  readTime: string;
  isFeatured?: boolean;
}

export interface CommunityConfig {
  communityName: string;
  tagline: string;
  description: string;
  whatsappLink: string;
  discordLink: string;
  githubRepoUrl: string;
}
