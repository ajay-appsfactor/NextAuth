import React from "react";
import { FileSpreadsheet } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left Column */}
        <div className="md:col-span-1 border border-gray-200 rounded-lg p-4 bg-white h-full">
          <h6 className="text-sm font-semibold mb-2">Reminders</h6>
          <p className="text-xs text-gray-600">You have no reminders.</p>
        </div>

        {/* Middle Column */}
        <div className="md:col-span-2 border border-gray-200 rounded-lg p-4 bg-white">
          <h6 className="text-sm font-semibold mb-4">Tiles</h6>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center border rounded bg-yellow-200 p-4 shadow-sm">
              <FileSpreadsheet className="mb-2" />
              <h6 className="text-sm font-medium">Balance Sheet</h6>
            </div>
            <div className="flex flex-col items-center border rounded bg-green-400 p-4 shadow-sm">
              <FileSpreadsheet className="mb-2" />
              <h6 className="text-sm font-medium">Create JE</h6>
            </div>
            <div className="flex flex-col items-center border rounded bg-amber-800 p-4 shadow-sm text-white">
              <FileSpreadsheet className="mb-2" />
              <h6 className="text-sm font-medium">Bank Statement</h6>
            </div>
            <div className="flex flex-col items-center border rounded bg-gray-600 p-4 shadow-sm text-white">
              <FileSpreadsheet className="mb-2" />
              <h6 className="text-sm font-medium">Income Statement</h6>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 border border-gray-200 rounded-lg p-4 bg-white h-full">
          <h6 className="text-sm font-semibold mb-2">KPI Meter</h6>
          <p className="text-xs text-gray-600">No KPI data available.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
