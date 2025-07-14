
import { useQuery } from "@tanstack/react-query";

export const useCertifications = () => {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      // Mock data for now
      return {
        data: [],
        total: 0
      };
    },
  });
};
