import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Wallet, Building2, Coins } from 'lucide-react-native';
import { Portfolio } from '@/types';
import { colors } from '@/constants/colors';
import { Card } from './ui/Card';

interface PortfolioSummaryProps {
  portfolio: Portfolio;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ portfolio }) => {
  const roi = portfolio.totalInvested > 0 
    ? ((portfolio.totalEarnings / portfolio.totalInvested) * 100).toFixed(2) 
    : '0.00';
  
  return (
    <Card variant="elevated" style={styles.container}>
      <Text style={styles.title}>Portfolio Summary</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Wallet size={20} color={colors.primary.blue} />
          </View>
          <View>
            <Text style={styles.statValue}>
              ${portfolio.totalInvested.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Invested</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIconContainer, styles.earningsIcon]}>
            <TrendingUp size={20} color={colors.primary.green} />
          </View>
          <View>
            <Text style={[styles.statValue, styles.earningsValue]}>
              ${portfolio.totalEarnings.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Building2 size={20} color={colors.primary.blue} />
          </View>
          <View>
            <Text style={styles.statValue}>
              {portfolio.totalProperties}
            </Text>
            <Text style={styles.statLabel}>Properties</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Coins size={20} color={colors.primary.blue} />
          </View>
          <View>
            <Text style={styles.statValue}>
              {portfolio.totalTokens.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Tokens</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.roiContainer}>
        <Text style={styles.roiLabel}>Portfolio ROI</Text>
        <Text style={styles.roiValue}>{roi}%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.blue}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsIcon: {
    backgroundColor: `${colors.primary.green}10`,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  earningsValue: {
    color: colors.primary.green,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  roiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.secondary.gray,
  },
  roiLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  roiValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.green,
  },
});