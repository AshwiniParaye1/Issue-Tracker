import { Search } from "lucide-react";
import React, { useState } from "react";

interface RepoFormProps {
  onSubmit: (repo: string) => void;
  loading: boolean;
}

const RepoForm: React.FC<RepoFormProps> = ({ onSubmit, loading }) => {
  const [repoInput, setRepoInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoInput.trim()) {
      onSubmit(repoInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-purple-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-purple-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-700 placeholder-gray-400"
            placeholder="Enter repository (e.g., facebook/react or https://github.com/facebook/react)"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="py-4 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          disabled={loading || !repoInput.trim()}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Fetching...</span>
            </div>
          ) : (
            <span>Analyze Issues</span>
          )}
        </button>
      </div>
      {loading && (
        <p className="text-sm text-purple-600 mt-3 text-center animate-pulse">
          Fetching up to 1000 issues. This might take a moment...
        </p>
      )}
    </form>
  );
};

export default RepoForm;
