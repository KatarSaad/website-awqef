import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WebsiteOrganizationsService } from "@/api/generated/services/WebsiteOrganizationsService";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import { TranslationDto } from "@/api/generated/models/TranslationDto";
import { toast } from "sonner";

export interface OrganizationFormData {
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en?: string;
    ar?: string;
  };
  logo?: string;
  tier?: WebsiteOrganizationResponseDto.tier;
  isVerified?: boolean;
}

// Direct hook for getting a single organization by ID
export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () =>
      WebsiteOrganizationsService.websiteOrganizationControllerGetWebsiteOrganization(
        id
      ),
    enabled: !!id,
  });
};

export const useOrganizations = () => {
  const queryClient = useQueryClient();

  const getOrganizations = () => {
    return useQuery({
      queryKey: ["organizations"],
      queryFn: () =>
        WebsiteOrganizationsService.websiteOrganizationControllerListWebsiteOrganizations(),
    });
  };

  const getOrganization = (id: number) => {
    return useQuery({
      queryKey: ["organization", id],
      queryFn: () =>
        WebsiteOrganizationsService.websiteOrganizationControllerGetWebsiteOrganization(
          id
        ),
      enabled: !!id,
    });
  };

  const createOrganization = () => {
    return useMutation({
      mutationFn: (data: OrganizationFormData) => {
        return WebsiteOrganizationsService.websiteOrganizationControllerCreateWebsiteOrganization(
          {
            name: data.name as TranslationDto,
            description: data.description as TranslationDto,
            logo: data.logo,
            tier: data.tier,
            isVerified: data.isVerified,
          }
        );
      },
      onSuccess: () => {
        toast.success("Organization created successfully");
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
      },
      onError: (error) => {
        toast.error("Failed to create organization");
        console.error(error);
      },
    });
  };

  const updateOrganization = (id: number) => {
    return useMutation({
      mutationFn: (data: OrganizationFormData) => {
        return WebsiteOrganizationsService.websiteOrganizationControllerUpdateWebsiteOrganization(
          id,
          {
            name: data.name as TranslationDto,
            description: data.description as TranslationDto,
            logo: data.logo,
            tier: data.tier,
            isVerified: data.isVerified,
          }
        );
      },
      onSuccess: () => {
        toast.success("Organization updated successfully");
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
        queryClient.invalidateQueries({ queryKey: ["organization", id] });
      },
      onError: (error) => {
        toast.error("Failed to update organization");
        console.error(error);
      },
    });
  };

  const deleteOrganization = () => {
    return useMutation({
      mutationFn: (id: number) => {
        return WebsiteOrganizationsService.websiteOrganizationControllerDeleteWebsiteOrganization(
          id
        );
      },
      onSuccess: () => {
        toast.success("Organization deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
      },
      onError: (error) => {
        toast.error("Failed to delete organization");
        console.error(error);
      },
    });
  };

  // Helper function to get translated text from TranslationDto
  const getTranslatedText = (field: any, lang: string = "en") => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      // Handle TranslationDto properly
      if (field.en !== undefined && field.ar !== undefined) {
        return field[lang] || "";
      }
      return field[lang] || field[Object.keys(field)[0]] || "";
    }
    return "";
  };

  return {
    getOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getTranslatedText,
  };
};
