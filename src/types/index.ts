//src/types/index.ts

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface WeeklyMetrics {
  weekStart: string;
  weekEnd: string;
  newIssues: number;
  closedIssues: number;
  ratio: number;
  closureRate: number;
  openAtStart: number;
}

export interface StatusCounts {
  open: number;
  closed: number;
  total: number;
}
