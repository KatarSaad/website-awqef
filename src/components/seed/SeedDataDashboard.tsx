
"use client";

import React from "react";
import { Database } from "lucide-react";
import { ProjectSeedButton } from "./ProjectSeedButton";
import { ContentSeedButton } from "./ContentSeedButton";

export const SeedDataDashboard: React.FC = () => {
  const handleSeedComplete = () => {
    // Refresh any data that needs to be updated
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Database className="mr-2" size={24} />
          Database Seeding Tools
        </h2>
        <p className="text-gray-600">
          Populate your database with sample data for testing and development
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectSeedButton onSeedComplete={handleSeedComplete} />
        <ContentSeedButton onSeedComplete={handleSeedComplete} />
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">What gets seeded:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Projects:</strong>
            <ul className="list-disc list-inside ml-2">
              <li>Website Organizations</li>
              <li>Projects</li>
              <li>Project Steps</li>
              <li>Investments & Pledges</li>
              <li>Certifications & Fatwas</li>
            </ul>
          </div>
          <div>
            <strong>Content:</strong>
            <ul className="list-disc list-inside ml-2">
              <li>Sections</li>
              <li>Posts</li>
              <li>Comments & Ratings</li>
              <li>Share Logs</li>
              <li>FAQs & Statistics</li>
              <li>Content References</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
