import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StatisticService } from "@/api/generated/services/StatisticService";
import { handleApiError } from "@/lib/api-client";

const statisticsApi = {
  getAllStatistics: async () => {
    try {
      const response =
        await StatisticService.statisticControllerListStatistics();
      return { data: response, success: true };
    } catch (error) {
      return { data: [], success: false, message: handleApiError(error) };
    }
  },
  getStatisticById: async (id: number) => {
    try {
      const response = await StatisticService.statisticControllerGetStatistic(
        id
      );
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
};

export const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: statisticsApi.getAllStatistics,
  });
};

export const useStatistic = (id: number) => {
  return useQuery({
    queryKey: ["statistic", id],
    queryFn: () => statisticsApi.getStatisticById(id),
    enabled: !!id,
  });
};
