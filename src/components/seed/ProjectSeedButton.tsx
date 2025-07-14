"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Folder } from "lucide-react";
import { useOrganizations } from "@/hooks/api/useOrganizations";
import { useCreateProject } from "@/hooks/api/useProjects";
import { useCreatePost } from "@/hooks/api/useContent";
import { useCreateFaq } from "@/hooks/api/useFaqs";
import { useCreateSponsor } from "@/hooks/api/useSponsors";
import { useCreateInvestment } from "@/hooks/api/useInvestments";
import { useCreateCategory } from "@/hooks/api/useCategories";
import { useCreatePledge } from "@/hooks/api/usePledges";
import { useCreateCertification } from "@/hooks/api/useCertifications";
import { useCreateFatwa } from "@/hooks/api/useFatwas";
import { useCreateProjectStep } from "@/hooks/api/useProjectSteps";
import { CreateFatwaDto } from "@/api/generated/models/CreateFatwaDto";
import { CreateProjectDto } from "@/api/generated/models/CreateProjectDto";
import { CreatePostDto } from "@/api/generated/models/CreatePostDto";

const translation = (en: string, ar: string) => ({ en, ar });
const randomString = (length = 6) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);
const randomUrl = () =>
  `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 10000)}`;

interface ProjectSeedButtonProps {
  onSeedComplete?: () => void;
}

export const ProjectSeedButton: React.FC<ProjectSeedButtonProps> = ({
  onSeedComplete,
}) => {
  const [loading, setLoading] = useState(false);
  // Get mutation functions from hooks
  const organizationsHook = useOrganizations();
  const createOrg = organizationsHook.createOrganization().mutateAsync;
  const createProject = useCreateProject().mutateAsync;
  const createPost = useCreatePost().mutateAsync;
  const createFaq = useCreateFaq().mutateAsync;
  const createFatwa = useCreateFatwa().mutateAsync;
  const createCategory = useCreateCategory().mutateAsync;
  const createPledge = useCreatePledge().mutateAsync; // projectId will be overridden
  const createCertification = useCreateCertification().mutateAsync;
  const createProjectStep = useCreateProjectStep(0).mutateAsync; // projectId will be overridden

  const seedProjects = async () => {
    setLoading(true);
    try {
      // 0. Seed Category
      const category = await createCategory({
        name: {
          en: "Seed Category",
          ar: "فئة افتراضية",
        },
        description: {
          en: "Seeded category for projects",
          ar: "فئة افتراضية للمشاريع",
        },
      });
      const categoryId = category?.data?.id;
      if (!categoryId) throw new Error("Failed to create category");

      // 1. Seed Organizations
      const orgs = [];
      for (let i = 0; i < 2; i++) {
        const org = await createOrg({
          name: {
            en: `Organization ${randomString(4)}`,
            ar: `منظمة ${randomString(4)}`,
          },
          description: {
            en: `Desc EN Org ${i + 1}`,
            ar: `وصف AR Org ${i + 1}`,
          },
          logo: randomUrl(),
        });
        if (org && org.data) orgs.push(org.data);
      }

      // 2. Seed Projects (linked to orgs)
      const projects = [];
      for (let i = 0; i < 5; i++) {
        const orgId = orgs[i % orgs.length]?.id;
        if (!orgId) continue;
        const project = await createProject({
          slug: `project-${randomString(6)}`,
          title: {
            en: `Project ${randomString(4)}`,
            ar: `مشروع ${randomString(4)}`,
          },
          description: {
            en: `Desc EN Proj ${i + 1}`,
            ar: `وصف AR Proj ${i + 1}`,
          },
          organizationId: orgId,
          targetAmount: Math.floor(Math.random() * 10000) + 1000,
          currency: "USD",
          categoryId,
          featured: false,
          status: CreateProjectDto.status.FUNDING,
        });
        if (project) projects.push(project);
      }

      // 3. Seed Project Steps, Sponsors, Investments, Pledges, Certifications, Fatwas for each project
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const orgId = orgs[0]?.id || 1;
        // Project Steps
        for (let step = 1; step <= 3; step++) {
          await createProjectStep({
            projectId: project.id,
            title: {
              en: `Step ${step} for Project ${i + 1}`,
              ar: `الخطوة ${step} للمشروع ${i + 1}`,
            },
            description: {
              en: `Description for step ${step}`,
              ar: `وصف للخطوة ${step}`,
            },
            order: step,
            isCompleted: false,
          });
        }
        // Sponsors
        const createSponsor = useCreateSponsor(project.id).mutateAsync;
        await createSponsor({
          projectId: project.id,
          organizationId: orgId,
          role: "Main Sponsor",
        });
        // Investments
        const createInvestment = useCreateInvestment(project.id).mutateAsync;
        await createInvestment({
          amount: Math.floor(Math.random() * 10000) + 1000,
          currency: "USD",
          investorId: 1,
          projectId: project.id,
          isConfirmed: true,
        });
        // Pledges
        await createPledge({
          amount: Math.floor(Math.random() * 5000) + 500,
          currency: "USD",
          userId: 1,
          projectId: project.id,
          isConfirmed: true,
        });
        // Certifications (use translation objects)
        await createCertification({
          title: {
            en: `Certification for Project ${i + 1}`,
            ar: `شهادة للمشروع ${i + 1}`,
          },
          issuingBody: { en: "Seeded Cert Body", ar: "جهة الإصدار" },
          documentUrl: randomUrl(),
          projectId: project.id,
          issuedAt: new Date().toISOString(),
          validUntil: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ).toISOString(),
        });
        // Fatwas
        await createFatwa({
          scholarName: { en: "Scholar EN", ar: "عالم AR" },
          summary: { en: "Fatwa summary EN", ar: "ملخص الفتوى AR" },
          documentUrl: randomUrl(),
          status: CreateFatwaDto.status.APPROVED,
        });
      }

      toast.success("Successfully seeded all project entities!");
      onSeedComplete?.();
    } catch (err) {
      console.error("Seed projects error:", err);
      toast.error("Failed to seed projects: " + (err as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={seedProjects}
      disabled={loading}
      className="flex items-center justify-center h-24 flex-col space-y-2 bg-blue-600 hover:bg-blue-700 w-full"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <Folder size={24} />
      )}
      <span className="text-sm font-medium">
        {loading ? "Seeding..." : "Seed Projects"}
      </span>
      <span className="text-xs opacity-75">5 projects + sub-entities</span>
    </Button>
  );
};
