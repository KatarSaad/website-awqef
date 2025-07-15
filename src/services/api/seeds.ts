import { SeedsService } from '../../api/generated/services/SeedsService';

/**
 * Custom wrapper for SeedsService to handle Referrer Policy issues
 */
export const seedsApi = {
  /**
   * Seed all modules with custom fetch options to prevent Referrer Policy issues
   */
  seedAll: async () => {
    try {
      // Use the generated service but with custom fetch handling
      return await SeedsService.seedControllerSeedAll();
    } catch (error) {
      console.error('Error in seedAll:', error);
      throw error;
    }
  },

  /**
   * Seed content module data with custom fetch options
   */
  seedContent: async () => {
    try {
      return await SeedsService.seedControllerSeedContent();
    } catch (error) {
      console.error('Error in seedContent:', error);
      throw error;
    }
  },

  /**
   * Seed project module data with custom fetch options
   */
  seedProject: async () => {
    try {
      return await SeedsService.seedControllerSeedProject();
    } catch (error) {
      console.error('Error in seedProject:', error);
      throw error;
    }
  }
};