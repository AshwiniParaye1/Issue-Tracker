//src/components/Header.tsx

import { Github } from "lucide-react";
import React from "react";

interface HeaderProps {
  repoName?: string;
}

const Header: React.FC<HeaderProps> = ({ repoName }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm mr-4">
              <Github size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
                GitHub Issue Explorer
              </h1>
              {repoName && (
                <div className="text-purple-200 mt-2 font-medium">
                  Analyzing: <span className="text-white">{repoName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="https://docs.github.com/en/rest/reference/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors flex items-center backdrop-blur-sm"
            >
              <span>GitHub Issues API Documentation</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
