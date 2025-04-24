import { Github } from "lucide-react";
import React from "react";

interface HeaderProps {
  repoName?: string;
}

const Header: React.FC<HeaderProps> = ({ repoName }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm mr-3">
            <Github size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
              GitHub Issue Explorer
            </h1>
            {repoName && (
              <div className="text-purple-200 text-sm">
                Analyzing: <span className="text-white">{repoName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
