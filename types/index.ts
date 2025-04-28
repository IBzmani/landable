export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerToken: number;
  totalTokens: number;
  availableTokens: number;
  images: string[];
  description: string;
  features: string[];
  roi: number;
  rentalYield: number;
  type: 'residential' | 'commercial' | 'industrial';
  status: 'available' | 'fully-funded' | 'coming-soon';
  fundingProgress: number;
}

export interface Portfolio {
  totalInvested: number;
  totalEarnings: number;
  totalProperties: number;
  totalTokens: number;
  investments: Investment[];
}

export interface Investment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  tokensOwned: number;
  investmentAmount: number;
  purchaseDate: string;
  earnings: number;
  roi: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'earning' | 'sale';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  details: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  kycVerified: boolean;
  walletAddress?: string;
  referralCode: string;
  referralEarnings: number;
}