import React from "react";
import { WeeklyMetrics } from "../../types";
import { formatDate } from "../../utils/dateUtils";

interface RatioMetricProps {
  weeklyMetrics: WeeklyMetrics[];
}

const RatioMetric: React.FC<RatioMetricProps> = ({ weeklyMetrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        New vs Closed Issues Ratio
      </h3>

      {weeklyMetrics.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No ratio data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 mb-4">
              <div className="text-sm font-medium text-gray-500">Week</div>
              <div className="text-sm font-medium text-gray-500 text-center">
                Ratio (New:Closed)
              </div>
              <div className="text-sm font-medium text-gray-500 text-center">
                Status
              </div>
            </div>

            <div className="space-y-3">
              {weeklyMetrics.map((week, index) => {
                // Handle infinity case when no closed issues
                const ratioDisplay =
                  week.closedIssues === 0
                    ? week.newIssues === 0
                      ? "0:0"
                      : `${week.newIssues}:0`
                    : `${week.newIssues}:${week.closedIssues}`;

                // Status based on ratio (if ratio > 1, more new than closed issues)
                const status =
                  week.closedIssues === 0 && week.newIssues === 0
                    ? "neutral"
                    : week.ratio > 1
                    ? "increasing"
                    : "decreasing";

                const statusColor = {
                  neutral: "bg-gray-200 text-gray-800",
                  increasing: "bg-yellow-100 text-yellow-800",
                  decreasing: "bg-green-100 text-green-800"
                }[status];

                const statusText = {
                  neutral: "No Change",
                  increasing: "Growing",
                  decreasing: "Shrinking"
                }[status];

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 items-center"
                  >
                    <div className="text-xs text-gray-600">
                      {formatDate(week.weekStart)} - {formatDate(week.weekEnd)}
                    </div>

                    <div className="text-center font-medium">
                      {ratioDisplay}
                    </div>

                    <div className="flex justify-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        {statusText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatioMetric;
