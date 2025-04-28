import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, TrendingUp } from 'lucide-react-native';
import { Property } from '@/types';
import { colors } from '@/constants/colors';
import { ProgressBar } from './ui/ProgressBar';
import { Badge } from './ui/Badge';

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'compact';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property,
  variant = 'default'
}) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };
  
  const getStatusBadge = () => {
    switch (property.status) {
      case 'available':
        return <Badge label="Available" variant="success" />;
      case 'fully-funded':
        return <Badge label="Fully Funded" variant="primary" />;
      case 'coming-soon':
        return <Badge label="Coming Soon" variant="warning" />;
      default:
        return null;
    }
  };
  
  if (variant === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactContainer}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: property.images[0] }} 
          style={styles.compactImage}
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {property.title}
          </Text>
          <View style={styles.compactLocation}>
            <MapPin size={12} color={colors.text.secondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {property.location}
            </Text>
          </View>
          <View style={styles.compactFooter}>
            <Text style={styles.priceText}>
              ${property.pricePerToken} <Text style={styles.perTokenText}>/ token</Text>
            </Text>
            <View style={styles.roiContainer}>
              <TrendingUp size={12} color={colors.primary.green} />
              <Text style={styles.roiText}>{property.roi}% ROI</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.images[0] }} 
          style={styles.image}
        />
        <View style={styles.badgeContainer}>
          {getStatusBadge()}
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {property.title}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.text.secondary} />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>${property.price.toLocaleString()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Per Token</Text>
              <Text style={styles.detailValue}>${property.pricePerToken}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>ROI</Text>
              <View style={styles.roiContainer}>
                <TrendingUp size={14} color={colors.primary.green} />
                <Text style={styles.roiText}>{property.roi}%</Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rental Yield</Text>
              <Text style={styles.detailValue}>{property.rentalYield}%</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.fundingText}>
            Funding Progress: {Math.round(property.fundingProgress)}%
          </Text>
          <ProgressBar progress={property.fundingProgress} />
          <View style={styles.tokensContainer}>
            <Text style={styles.tokensText}>
              {property.availableTokens.toLocaleString()} tokens available
            </Text>
            <Text style={styles.tokensText}>
              of {property.totalTokens.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  roiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roiText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.green,
  },
  footer: {
    gap: 8,
  },
  fundingText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  tokensContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokensText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  
  // Compact variant
  compactContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: colors.secondary.white,
    overflow: 'hidden',
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
    height: 100,
  },
  compactImage: {
    width: 100,
    height: '100%',
  },
  compactContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  compactLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  perTokenText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text.secondary,
  },
});