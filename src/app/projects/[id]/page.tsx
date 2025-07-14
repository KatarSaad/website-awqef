"use client";

import React from "react";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  
  return <ProjectDetailView projectId={projectId} />;
}