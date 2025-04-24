//src/services/github.ts

import { GitHubIssue, StatusCounts, WeeklyMetrics } from "../types";
import { getLastNWeeks, isDateInRange } from "../utils/dateUtils";

/**
 * Fetch issues from a GitHub repository
 */
export const fetchRepositoryIssues = async (
  owner: string,
  repo: string
): Promise<GitHubIssue[]> => {
  const perPage = 100; // GitHub API max per page
  const maxPages = 10; // Limit to 10 pages (1000 issues)
  let allIssues: GitHubIssue[] = [];

  try {
    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json"
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch repository issues");
      }

      const issues: GitHubIssue[] = await response.json();

      if (issues.length === 0) {
        break; // No more issues to fetch
      }

      allIssues = [...allIssues, ...issues];

      if (issues.length < perPage) {
        break; // Last page has fewer items than perPage
      }
    }

    return allIssues;
  } catch (error) {
    console.error("Error fetching repository issues:", error);
    throw error;
  }
};

/**
 * Calculate status counts from issues
 */
export const calculateStatusCounts = (issues: GitHubIssue[]): StatusCounts => {
  const open = issues.filter((issue) => issue.state === "open").length;
  const closed = issues.filter((issue) => issue.state === "closed").length;

  return {
    open,
    closed,
    total: issues.length
  };
};

/**
 * Calculate weekly metrics from issues
 */
export const calculateWeeklyMetrics = (
  issues: GitHubIssue[],
  weeksCount: number = 10
): WeeklyMetrics[] => {
  const weeks = getLastNWeeks(weeksCount);
  const weeklyMetrics: WeeklyMetrics[] = [];

  weeks.forEach(({ start, end }) => {
    const weekStart = start.toISOString();
    const weekEnd = end.toISOString();

    // Issues created during this week
    const newIssues = issues.filter((issue) => {
      const createdDate = new Date(issue.created_at);
      return isDateInRange(createdDate, start, end);
    });

    // Issues closed during this week
    const closedIssues = issues.filter((issue) => {
      if (!issue.closed_at) return false;
      const closedDate = new Date(issue.closed_at);
      return isDateInRange(closedDate, start, end);
    });

    // Issues open at the start of the week
    const openAtStart = issues.filter((issue) => {
      const createdDate = new Date(issue.created_at);
      const closedDate = issue.closed_at ? new Date(issue.closed_at) : null;

      // Created before week start and either:
      // 1. Not closed yet, or
      // 2. Closed after week start
      return createdDate < start && (!closedDate || closedDate >= start);
    }).length;

    // Calculate ratio of new vs closed
    const ratio =
      closedIssues.length > 0
        ? newIssues.length / closedIssues.length
        : newIssues.length > 0
        ? Infinity
        : 0;

    // Calculate closure rate
    // (Number of Issues closed in the week) / (Issues open at start of week + New issues during week)
    const denominator = openAtStart + newIssues.length;
    const closureRate = denominator > 0 ? closedIssues.length / denominator : 0;

    weeklyMetrics.push({
      weekStart,
      weekEnd,
      newIssues: newIssues.length,
      closedIssues: closedIssues.length,
      ratio,
      closureRate,
      openAtStart
    });
  });

  return weeklyMetrics;
};

/**
 * Calculate average weekly closure rate
 */
export const calculateAverageClosureRate = (
  weeklyMetrics: WeeklyMetrics[]
): number => {
  if (weeklyMetrics.length === 0) return 0;

  const sum = weeklyMetrics.reduce((acc, week) => acc + week.closureRate, 0);
  return sum / weeklyMetrics.length;
};

/**
 * Parse a GitHub repository URL or string into owner and repo parts
 */
export const parseRepositoryString = (
  repoString: string
): { owner: string; repo: string } => {
  // Remove any trailing slash
  repoString = repoString.trim().replace(/\/$/, "");

  // Handle full GitHub URLs
  if (repoString.includes("github.com")) {
    const url = new URL(
      repoString.startsWith("http") ? repoString : `https://${repoString}`
    );
    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  }

  // Handle owner/repo format
  const parts = repoString.split("/").filter(Boolean);
  if (parts.length === 2) {
    return { owner: parts[0], repo: parts[1] };
  }

  throw new Error(
    'Invalid repository format. Please use "owner/repo" or a GitHub URL.'
  );
};
