import React from "react";
import { WeeklyMetrics } from "../../types";
import { formatDate } from "../../utils/dateUtils";

interface WeeklyCountMetricProps {
  weeklyMetrics: WeeklyMetrics[];
}

const WeeklyCountMetric: React.FC<WeeklyCountMetricProps> = ({
  weeklyMetrics
}) => {
  // Find maximum for scaling the chart
  const maxCount = Math.max(
    ...weeklyMetrics.map((week) => Math.max(week.newIssues, week.closedIssues))
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Weekly Issue Count
      </h3>

      {weeklyMetrics.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No weekly data available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[1fr_repeat(2,_minmax(0,_1fr))] gap-2 mb-4">
              <div className="text-sm font-medium text-gray-500">Week</div>
              <div className="text-sm font-medium text-green-600 text-center">
                New Issues
              </div>
              <div className="text-sm font-medium text-blue-600 text-center">
                Closed Issues
              </div>
            </div>

            <div className="space-y-3">
              {weeklyMetrics.map((week, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_repeat(2,_minmax(0,_1fr))] gap-2 items-center"
                >
                  <div className="text-xs text-gray-600">
                    {formatDate(week.weekStart)} - {formatDate(week.weekEnd)}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-full h-4">
                      <div
                        className="bg-green-200 h-4 rounded-full relative"
                        style={{
                          width: `${
                            maxCount ? (week.newIssues / maxCount) * 100 : 0
                          }%`
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-green-800">
                          {week.newIssues}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-full h-4">
                      <div
                        className="bg-blue-200 h-4 rounded-full relative"
                        style={{
                          width: `${
                            maxCount ? (week.closedIssues / maxCount) * 100 : 0
                          }%`
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-blue-800">
                          {week.closedIssues}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyCountMetric;
