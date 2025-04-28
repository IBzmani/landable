import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Property, Portfolio, Transaction } from '@/types';
import { properties } from '@/mocks/properties';
import { mockPortfolio, mockTransactions } from '@/mocks/portfolio';

interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  portfolio: Portfolio;
  transactions: Transaction[];
  isLoading: boolean;
  
  // Property actions
  fetchProperties: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<Property | undefined>;
  
  // Portfolio actions
  fetchPortfolio: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  
  // Investment actions
  investInProperty: (propertyId: string, tokenAmount: number) => Promise<void>;
  sellTokens: (investmentId: string, tokenAmount: number) => Promise<void>;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: [],
      featuredProperties: [],
      portfolio: {
        totalInvested: 0,
        totalEarnings: 0,
        totalProperties: 0,
        totalTokens: 0,
        investments: [],
      },
      transactions: [],
      isLoading: false,
      
      fetchProperties: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get featured properties (available with highest ROI)
        const featured = [...properties]
          .filter(p => p.status === 'available')
          .sort((a, b) => b.roi - a.roi)
          .slice(0, 3);
        
        set({ 
          properties,
          featuredProperties: featured,
          isLoading: false,
        });
      },
      
      fetchPropertyById: async (id) => {
        const property = get().properties.find(p => p.id === id);
        if (!property && get().properties.length === 0) {
          await get().fetchProperties();
          return get().properties.find(p => p.id === id);
        }
        return property;
      },
      
      fetchPortfolio: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ 
          portfolio: mockPortfolio,
          isLoading: false,
        });
      },
      
      fetchTransactions: async () => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set({ 
          transactions: mockTransactions,
          isLoading: false,
        });
      },
      
      investInProperty: async (propertyId, tokenAmount) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const property = get().properties.find(p => p.id === propertyId);
        if (!property) {
          set({ isLoading: false });
          throw new Error('Property not found');
        }
        
        if (property.availableTokens < tokenAmount) {
          set({ isLoading: false });
          throw new Error('Not enough tokens available');
        }
        
        const investmentAmount = property.pricePerToken * tokenAmount;
        
        // Update property available tokens
        const updatedProperties = get().properties.map(p => {
          if (p.id === propertyId) {
            return {
              ...p,
              availableTokens: p.availableTokens - tokenAmount,
              fundingProgress: ((p.totalTokens - (p.availableTokens - tokenAmount)) / p.totalTokens) * 100,
            };
          }
          return p;
        });
        
        // Create new investment
        const newInvestment = {
          id: `inv-${Date.now()}`,
          propertyId,
          propertyTitle: property.title,
          propertyImage: property.images[0],
          tokensOwned: tokenAmount,
          investmentAmount,
          purchaseDate: new Date().toISOString().split('T')[0],
          earnings: 0,
          roi: property.roi,
        };
        
        // Create transaction
        const newTransaction = {
          id: `tx-${Date.now()}`,
          type: 'investment' as const,
          amount: investmentAmount,
          date: new Date().toISOString().split('T')[0],
          status: 'completed' as const,
          details: `Investment in ${property.title}`,
        };
        
        // Update portfolio
        const updatedPortfolio = {
          ...get().portfolio,
          totalInvested: get().portfolio.totalInvested + investmentAmount,
          totalProperties: get().portfolio.investments.some(i => i.propertyId === propertyId)
            ? get().portfolio.totalProperties
            : get().portfolio.totalProperties + 1,
          totalTokens: get().portfolio.totalTokens + tokenAmount,
          investments: [...get().portfolio.investments, newInvestment],
        };
        
        set({
          properties: updatedProperties,
          portfolio: updatedPortfolio,
          transactions: [...get().transactions, newTransaction],
          isLoading: false,
        });
      },
      
      sellTokens: async (investmentId, tokenAmount) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const investment = get().portfolio.investments.find(i => i.id === investmentId);
        if (!investment) {
          set({ isLoading: false });
          throw new Error('Investment not found');
        }
        
        if (investment.tokensOwned < tokenAmount) {
          set({ isLoading: false });
          throw new Error('Not enough tokens owned');
        }
        
        const property = get().properties.find(p => p.id === investment.propertyId);
        if (!property) {
          set({ isLoading: false });
          throw new Error('Property not found');
        }
        
        const saleAmount = property.pricePerToken * tokenAmount;
        
        // Update property available tokens
        const updatedProperties = get().properties.map(p => {
          if (p.id === investment.propertyId) {
            return {
              ...p,
              availableTokens: p.availableTokens + tokenAmount,
              fundingProgress: ((p.totalTokens - (p.availableTokens + tokenAmount)) / p.totalTokens) * 100,
            };
          }
          return p;
        });
        
        // Update investment
        const updatedInvestments = get().portfolio.investments.map(i => {
          if (i.id === investmentId) {
            const updatedTokens = i.tokensOwned - tokenAmount;
            return {
              ...i,
              tokensOwned: updatedTokens,
              investmentAmount: (i.investmentAmount / i.tokensOwned) * updatedTokens,
            };
          }
          return i;
        }).filter(i => i.tokensOwned > 0); // Remove investments with 0 tokens
        
        // Create transaction
        const newTransaction = {
          id: `tx-${Date.now()}`,
          type: 'sale' as const,
          amount: saleAmount,
          date: new Date().toISOString().split('T')[0],
          status: 'completed' as const,
          details: `Sale of ${tokenAmount} tokens from ${property.title}`,
        };
        
        // Update portfolio
        const updatedPortfolio = {
          ...get().portfolio,
          totalInvested: get().portfolio.totalInvested - saleAmount,
          totalProperties: updatedInvestments.length,
          totalTokens: get().portfolio.totalTokens - tokenAmount,
          investments: updatedInvestments,
        };
        
        set({
          properties: updatedProperties,
          portfolio: updatedPortfolio,
          transactions: [...get().transactions, newTransaction],
          isLoading: false,
        });
      },
    }),
    {
      name: 'property-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);