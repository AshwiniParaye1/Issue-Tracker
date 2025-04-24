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
                GitHub Issue tracker
              </h1>
              {repoName && (
                <div className="text-purple-200 mt-2 font-medium">
                  Analyzing: <span className="text-white">{repoName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
