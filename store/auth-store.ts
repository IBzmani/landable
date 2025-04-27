import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock user for demo purposes
const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  kycVerified: false,
  referralCode: 'JOHN123',
  referralEarnings: 250,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, we'll just check if email contains "error" to simulate a failed login
        if (email.includes('error')) {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
        
        set({ 
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      signup: async (name, email, password) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, we'll just check if email contains "error" to simulate a failed signup
        if (email.includes('error')) {
          set({ isLoading: false });
          throw new Error('Email already in use');
        }
        
        const newUser = {
          ...mockUser,
          name,
          email,
        };
        
        set({ 
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);