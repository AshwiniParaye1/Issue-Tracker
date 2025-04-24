import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import RepoForm from "./components/RepoForm";
import { useGitHubIssues } from "./hooks/useGitHubIssues";
import { parseRepositoryString } from "./services/github";

function App() {
  const {
    issues,
    statusCounts,
    weeklyMetrics,
    averageClosureRate,
    loading,
    error,
    fetchIssues
  } = useGitHubIssues();
  const [repoName, setRepoName] = useState<string>("");

  const handleRepoSubmit = async (repoString: string) => {
    try {
      const { owner, repo } = parseRepositoryString(repoString);
      setRepoName(`${owner}/${repo}`);
      await fetchIssues(repoString);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header repoName={repoName} />

      <main className="flex-grow pb-6">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 text-center">
              Analyze GitHub Repository Issues
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center mb-4">
              Up to 1000 most recent issues will be analyzed
            </p>

            <RepoForm onSubmit={handleRepoSubmit} loading={loading} />

            {error && (
              <div className="mt-4 p-4 bg-red-50/50 backdrop-blur-sm border border-red-200 rounded-lg text-red-700">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}
          </div>

          {!loading && issues.length > 0 && (
            <div className="animate-fadeIn">
              <Dashboard
                statusCounts={statusCounts}
                weeklyMetrics={weeklyMetrics}
                averageClosureRate={averageClosureRate}
                issues={issues}
              />
            </div>
          )}

          {!loading && !error && issues.length === 0 && repoName && (
            <div className="text-center py-6">
              <p className="text-gray-600">
                No issues found in this repository.
              </p>
            </div>
          )}

          {!loading && !error && !repoName && (
            <div className="text-center py-8">
              <div className="max-w-md mx-auto bg-white/50 backdrop-blur-sm rounded-lg shadow-lg border border-purple-100 p-4">
                <h3 className="text-lg font-medium text-purple-800 mb-3">
                  Examples to try:
                </h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded transition-colors">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-700">facebook/react</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded transition-colors">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-700">microsoft/vscode</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded transition-colors">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-700">vuejs/vue</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-purple-100 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm">
            GitHub Issue Explorer — Analyze repository health and issue trends
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
