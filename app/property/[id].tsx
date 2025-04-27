import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  Home, 
  Check, 
  ChevronLeft,
  Share2
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { usePropertyStore } from '@/store/property-store';
import { Property } from '@/types';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { fetchPropertyById, isLoading } = usePropertyStore();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    const loadProperty = async () => {
      if (id) {
        const result = await fetchPropertyById(id as string);
        if (result) {
          setProperty(result);
        }
      }
    };
    
    loadProperty();
  }, [id]);
  
  const handleInvest = () => {
    if (property) {
      router.push(`/invest/${property.id}`);
    }
  };
  
  const handleShare = () => {
    // Share functionality would go here
  };
  
  const getStatusBadge = () => {
    if (!property) return null;
    
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
  
  if (isLoading || !property) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.blue} />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: property.title,
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleShare}
            >
              <Share2 size={20} color={colors.text.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setActiveImageIndex(newIndex);
            }}
          >
            {property.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.propertyImage}
              />
            ))}
          </ScrollView>
          
          <View style={styles.imagePagination}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          
          <View style={styles.badgeContainer}>
            {getStatusBadge()}
          </View>
        </View>
        
        <View style={styles.header}>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.text.secondary} />
            <Text style={styles.locationText}>{property.location}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Price</Text>
            <Text style={styles.statValue}>${property.price.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Per Token</Text>
            <Text style={styles.statValue}>${property.pricePerToken}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>ROI</Text>
            <View style={styles.roiContainer}>
              <TrendingUp size={16} color={colors.primary.green} />
              <Text style={styles.roiText}>{property.roi}%</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.fundingSection}>
          <View style={styles.fundingHeader}>
            <Text style={styles.sectionTitle}>Funding Progress</Text>
            <Text style={styles.fundingPercentage}>{Math.round(property.fundingProgress)}%</Text>
          </View>
          <ProgressBar progress={property.fundingProgress} height={10} />
          <View style={styles.tokensContainer}>
            <Text style={styles.tokensText}>
              {property.availableTokens.toLocaleString()} tokens available
            </Text>
            <Text style={styles.tokensText}>
              of {property.totalTokens.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{property.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {property.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Check size={16} color={colors.primary.green} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Property Type</Text>
              <Text style={styles.detailValue}>
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rental Yield</Text>
              <Text style={styles.detailValue}>{property.rentalYield}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Minimum Investment</Text>
              <Text style={styles.detailValue}>${property.pricePerToken}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Expected ROI</Text>
              <Text style={styles.detailValue}>{property.roi}%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.tokenPrice}>${property.pricePerToken}</Text>
          <Text style={styles.perTokenText}>per token</Text>
        </View>
        <Button 
          title={property.status === 'available' ? 'Invest Now' : 'Join Waitlist'} 
          onPress={handleInvest}
          disabled={property.status !== 'available'}
          style={styles.investButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerButton: {
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  propertyImage: {
    width,
    height: 250,
  },
  imagePagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary.white,
    opacity: 0.5,
  },
  paginationDotActive: {
    opacity: 1,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.secondary.gray,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  roiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roiText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.green,
  },
  fundingSection: {
    padding: 16,
  },
  fundingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fundingPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary.blue,
  },
  tokensContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tokensText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.secondary.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.secondary.white,
    borderTopWidth: 1,
    borderTopColor: colors.secondary.gray,
  },
  priceContainer: {},
  tokenPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  perTokenText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  investButton: {
    flex: 1,
    marginLeft: 16,
  },
});