import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, Calendar, Coins } from 'lucide-react-native';
import { Investment } from '@/types';
import { colors } from '@/constants/colors';

interface InvestmentCardProps {
  investment: Investment;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/property/${investment.propertyId}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: investment.propertyImage }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {investment.propertyTitle}
        </Text>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Coins size={14} color={colors.text.secondary} />
            <Text style={styles.detailText}>
              {investment.tokensOwned} tokens owned
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Calendar size={14} color={colors.text.secondary} />
            <Text style={styles.detailText}>
              Purchased: {investment.purchaseDate}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <TrendingUp size={14} color={colors.primary.green} />
            <Text style={styles.roiText}>
              {investment.roi}% ROI
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Investment</Text>
            <Text style={styles.footerValue}>
              ${investment.investmentAmount.toLocaleString()}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Earnings</Text>
            <Text style={[styles.footerValue, styles.earningsValue]}>
              ${investment.earnings.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.secondary.white,
    overflow: 'hidden',
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  details: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  roiText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary.green,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.secondary.gray,
    paddingTop: 8,
  },
  footerItem: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  earningsValue: {
    color: colors.primary.green,
  },
});