import React from "react";

interface AverageClosureMetricProps {
  averageClosureRate: number;
}

const AverageClosureMetric: React.FC<AverageClosureMetricProps> = ({
  averageClosureRate
}) => {
  // Calculate rate as percentage
  const ratePercentage = (averageClosureRate * 100).toFixed(1);

  // Define thresholds for color coding
  let color = "text-gray-800";
  let bgColor = "bg-gray-100";
  let message = "No Data";

  if (averageClosureRate > 0) {
    if (averageClosureRate > 0.3) {
      color = "text-green-800";
      bgColor = "bg-green-100";
      message = "Excellent";
    } else if (averageClosureRate > 0.2) {
      color = "text-teal-800";
      bgColor = "bg-teal-100";
      message = "Very Good";
    } else if (averageClosureRate > 0.1) {
      color = "text-blue-800";
      bgColor = "bg-blue-100";
      message = "Good";
    } else {
      color = "text-yellow-800";
      bgColor = "bg-yellow-100";
      message = "Needs Improvement";
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Average Weekly Closure Rate
      </h3>

      <div className="flex flex-col items-center justify-center p-4">
        <div className={`text-5xl font-bold ${color}`}>{ratePercentage}%</div>

        <div className="mt-3 text-sm text-gray-500">
          Average percentage of issues closed per week
        </div>

        <div
          className={`mt-5 px-4 py-2 rounded-full text-sm font-medium ${color} ${bgColor}`}
        >
          {message}
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Higher rates indicate more effective issue management.</p>
          <p>Calculated across the last 10 weeks.</p>
        </div>
      </div>
    </div>
  );
};

export default AverageClosureMetric;
