import { useState } from 'react';
import { seedsApi } from '../../services/api/seeds';

/**
 * Custom hook for interacting with the Seeds API
 */
export const useSeeds = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Seed all modules
   */
  const seedAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await seedsApi.seedAll();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  /**
   * Seed content module data
   */
  const seedContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await seedsApi.seedContent();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  /**
   * Seed project module data
   */
  const seedProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await seedsApi.seedProject();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      throw err;
    }
  };

  return {
    seedAll,
    seedContent,
    seedProject,
    loading,
    error,
  };
};