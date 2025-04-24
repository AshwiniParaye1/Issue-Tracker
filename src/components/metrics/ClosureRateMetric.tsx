import React from "react";
import { WeeklyMetrics } from "../../types";
import { formatDate } from "../../utils/dateUtils";

interface ClosureRateMetricProps {
  weeklyMetrics: WeeklyMetrics[];
}

const ClosureRateMetric: React.FC<ClosureRateMetricProps> = ({
  weeklyMetrics
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Weekly Closure Rate
      </h3>

      {weeklyMetrics.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No closure rate data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="text-xs text-gray-500 mb-2">
              Closure Rate = Issues Closed / (Open at Start + New Issues)
            </div>

            <div className="grid grid-cols-[1fr_repeat(4,_minmax(0,_1fr))] gap-2 mb-4">
              <div className="text-sm font-medium text-gray-500">Week</div>
              <div className="text-sm font-medium text-gray-500 text-center">
                Open at Start
              </div>
              <div className="text-sm font-medium text-gray-500 text-center">
                New Issues
              </div>
              <div className="text-sm font-medium text-gray-500 text-center">
                Closed Issues
              </div>
              <div className="text-sm font-medium text-gray-500 text-center">
                Closure Rate
              </div>
            </div>

            <div className="space-y-3">
              {weeklyMetrics.map((week, index) => {
                // Calculate rate as percentage
                const ratePercentage = (week.closureRate * 100).toFixed(1);

                // Determine color based on rate
                let rateColor = "text-gray-800 bg-gray-100";
                if (week.closureRate > 0.2)
                  rateColor = "text-green-800 bg-green-100";
                else if (week.closureRate > 0.1)
                  rateColor = "text-blue-800 bg-blue-100";
                else if (week.closureRate > 0)
                  rateColor = "text-yellow-800 bg-yellow-100";

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_repeat(4,_minmax(0,_1fr))] gap-2 items-center"
                  >
                    <div className="text-xs text-gray-600">
                      {formatDate(week.weekStart)}
                    </div>

                    <div className="text-center">{week.openAtStart}</div>

                    <div className="text-center">{week.newIssues}</div>

                    <div className="text-center">{week.closedIssues}</div>

                    <div className="flex justify-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${rateColor}`}
                      >
                        {ratePercentage}%
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

export default ClosureRateMetric;
