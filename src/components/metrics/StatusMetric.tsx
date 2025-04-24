import React from "react";
import { StatusCounts } from "../../types";

interface StatusMetricProps {
  statusCounts: StatusCounts;
}

const StatusMetric: React.FC<StatusMetricProps> = ({ statusCounts }) => {
  const { open, closed, total } = statusCounts;
  const openPercentage = total > 0 ? (open / total) * 100 : 0;
  const closedPercentage = total > 0 ? (closed / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Issue Status</h3>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Total Issues
          </span>
          <span className="text-xl font-semibold">{total}</span>
        </div>

        <div className="h-px bg-gray-100"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-600">Open</span>
              <span className="text-lg font-semibold text-green-600">
                {open}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {openPercentage.toFixed(1)}% of total
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600">Closed</span>
              <span className="text-lg font-semibold text-blue-600">
                {closed}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {closedPercentage.toFixed(1)}% of total
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${openPercentage}%` }}
          ></div>
        </div>

        <div className="flex text-xs text-gray-500 justify-between mt-1">
          <span>Open: {openPercentage.toFixed(1)}%</span>
          <span>Closed: {closedPercentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusMetric;
