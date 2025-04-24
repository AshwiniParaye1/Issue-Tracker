//src/components/Dashboard.tsx

import { FileText } from "lucide-react";
import React, { useState } from "react";
import { GitHubIssue, StatusCounts, WeeklyMetrics } from "../types";
import IssuesTable from "./IssuesTable";
import AverageClosureMetric from "./metrics/AverageClosureMetric";
import ClosureRateMetric from "./metrics/ClosureRateMetric";
import RatioMetric from "./metrics/RatioMetric";
import StatusMetric from "./metrics/StatusMetric";
import WeeklyCountMetric from "./metrics/WeeklyCountMetric";

interface DashboardProps {
  statusCounts: StatusCounts;
  weeklyMetrics: WeeklyMetrics[];
  averageClosureRate: number;
  issues: GitHubIssue[];
}

const Dashboard: React.FC<DashboardProps> = ({
  statusCounts,
  weeklyMetrics,
  averageClosureRate,
  issues
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Top row - summary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <StatusMetric statusCounts={statusCounts} />
          </div>

          <div className="lg:col-span-1">
            <AverageClosureMetric averageClosureRate={averageClosureRate} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Issue Summary
                </h3>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FileText size={16} className="mr-1" />
                  <span>View All Issues</span>
                </button>
              </div>

              <div className="flex flex-col gap-5 justify-center h-[calc(100%-2.5rem)]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-500 text-sm mb-1">Total Issues</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {statusCounts.total}
                    </p>
                  </div>

                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <p className="text-blue-500 text-sm mb-1">Weeks Analyzed</p>
                    <p className="text-3xl font-bold text-blue-900">
                      {weeklyMetrics.length}
                    </p>
                  </div>
                </div>

                <p className="text-center text-gray-600 text-sm px-4">
                  This analysis provides insights into GitHub repository issues
                  over time, helping you understand trends and project health.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second row - weekly metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyCountMetric weeklyMetrics={weeklyMetrics} />
          <RatioMetric weeklyMetrics={weeklyMetrics} />
        </div>

        {/* Third row - detailed closure rates */}
        <div>
          <ClosureRateMetric weeklyMetrics={weeklyMetrics} />
        </div>
      </div>

      {isModalOpen && (
        <IssuesTable issues={issues} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
