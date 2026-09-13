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
  domain: Exclude<Domain, 'All'>;
  title: string;
  summary: string;
  content: string; // The full ChatGPT-style detailed advice / blog text
  createdAt: string;
  readTime: string;
}

export interface CommunityConfig {
  communityName: string;
  tagline: string;
  description: string;
  whatsappLink: string;
  discordLink: string;
  githubRepoUrl: string;
}
