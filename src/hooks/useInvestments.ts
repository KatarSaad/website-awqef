
import { useQuery } from '@tanstack/react-query';

interface Investment {
  id: string;
  title: string;
  description: string;
  amount: number;
  funded: number;
  investors: number;
  returns: number;
  duration: string;
  category: string;
  image: string;
  shariaCompliant: boolean;
  minInvestment: number;
}

interface InvestmentStats {
  totalInvestments: number;
  totalFunded: number;
  activeProjects: number;
  totalInvestors: number;
}

// Mock data for investments
const mockInvestments: Investment[] = [
  {
    id: '1',
    title: 'Tech Innovation Fund',
    description: 'Investment in cutting-edge technology solutions',
    amount: 1000000,
    funded: 750000,
    investors: 125,
    returns: 12.5,
    duration: '24 months',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    shariaCompliant: true,
    minInvestment: 5000
  },
  {
    id: '2',
    title: 'Real Estate Development',
    description: 'Sustainable housing project in Dubai',
    amount: 2500000,
    funded: 1800000,
    investors: 89,
    returns: 15.2,
    duration: '36 months',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    shariaCompliant: true,
    minInvestment: 10000
  }
];

// Mock stats
const mockStats: InvestmentStats = {
  totalInvestments: 50000000,
  totalFunded: 38000000,
  activeProjects: 25,
  totalInvestors: 1250
};

export const useInvestments = () => {
  return useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockInvestments;
    },
  });
};

export const useInvestmentStats = () => {
  return useQuery({
    queryKey: ['investment-stats'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockStats;
    },
  });
};

export type { Investment, InvestmentStats };
