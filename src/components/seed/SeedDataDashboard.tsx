"use client";

import React from "react";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SeedsService } from "@/api/generated";
// Using environment variable directly

export const SeedDataDashboard: React.FC = () => {
  const handleSeedAll = async () => {
    try {
      toast.loading("Seeding all data...");
      const response = await SeedsService.seedControllerSeedAll();
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      if (!response.ok) {
        throw new Error("Failed to seed data");
      }

      toast.success("All data seeded successfully!");
      // Refresh to show new data
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("Failed to seed data. Please try again.");
    }
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

      <div className="flex justify-center">
        <Button
          onClick={handleSeedAll}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Database className="mr-2" size={20} />
          Seed All Data
        </Button>
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
        <p className="mt-4 text-sm text-gray-500 italic">
          All data will be seeded with a single click
        </p>
      </div>
    </div>
  );
};
