//src/hooks/useGitHubIssues.ts

import { useCallback, useState } from "react";
import {
  calculateAverageClosureRate,
  calculateStatusCounts,
  calculateWeeklyMetrics,
  fetchRepositoryIssues,
  parseRepositoryString
} from "../services/github";
import { GitHubIssue, StatusCounts, WeeklyMetrics } from "../types";

interface UseGitHubIssuesResult {
  issues: GitHubIssue[];
  statusCounts: StatusCounts;
  weeklyMetrics: WeeklyMetrics[];
  averageClosureRate: number;
  loading: boolean;
  error: string | null;
  fetchIssues: (repoString: string) => Promise<void>;
}

export const useGitHubIssues = (): UseGitHubIssuesResult => {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    open: 0,
    closed: 0,
    total: 0
  });
  const [weeklyMetrics, setWeeklyMetrics] = useState<WeeklyMetrics[]>([]);
  const [averageClosureRate, setAverageClosureRate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = useCallback(async (repoString: string) => {
    setLoading(true);
    setError(null);

    try {
      const { owner, repo } = parseRepositoryString(repoString);
      const fetchedIssues = await fetchRepositoryIssues(owner, repo);
      setIssues(fetchedIssues);

      // Calculate metrics
      const counts = calculateStatusCounts(fetchedIssues);
      setStatusCounts(counts);

      const metrics = calculateWeeklyMetrics(fetchedIssues);
      setWeeklyMetrics(metrics);

      const avgRate = calculateAverageClosureRate(metrics);
      setAverageClosureRate(avgRate);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    issues,
    statusCounts,
    weeklyMetrics,
    averageClosureRate,
    loading,
    error,
    fetchIssues
  };
};
