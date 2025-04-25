import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Building2, TrendingUp, Wallet } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/auth-store';
import { usePropertyStore } from '@/store/property-store';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    featuredProperties, 
    portfolio,
    fetchProperties, 
    fetchPortfolio,
    isLoading 
  } = usePropertyStore();
  
  useEffect(() => {
    fetchProperties();
    fetchPortfolio();
  }, []);
  
  const handleRefresh = () => {
    fetchProperties();
    fetchPortfolio();
  };
  
  const handleViewAllProperties = () => {
    router.push('/properties');
  };
  
  const handleViewPortfolio = () => {
    router.push('/portfolio');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'Investor'}</Text>
            <Text style={styles.subtitle}>Discover your next investment opportunity</Text>
          </View>
          <TouchableOpacity onPress={handleViewPortfolio}>
            <Image 
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        
        <Card variant="elevated" style={styles.portfolioCard}>
          <Text style={styles.portfolioTitle}>Your Portfolio</Text>
          <View style={styles.portfolioStats}>
            <View style={styles.portfolioStat}>
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
            <View style={styles.portfolioStat}>
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
          <Button 
            title="View Portfolio" 
            variant="outline"
            size="small"
            onPress={handleViewPortfolio}
            style={styles.viewPortfolioButton}
          />
        </Card>
        
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Properties</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={handleViewAllProperties}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={colors.primary.blue} />
            </TouchableOpacity>
          </View>
          
          {featuredProperties.length > 0 ? (
            <FlatList
              data={featuredProperties}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PropertyCard property={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={300}
              style={styles.featuredListContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Building2 size={40} color={colors.text.secondary} />
              <Text style={styles.emptyStateText}>
                No featured properties available
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.infoSection}>
          <Card variant="elevated" style={styles.infoCard}>
            <Text style={styles.infoTitle}>How It Works</Text>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Browse Properties</Text>
                <Text style={styles.stepDescription}>
                  Explore our curated selection of high-quality real estate investments
                </Text>
              </View>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Purchase Tokens</Text>
                <Text style={styles.stepDescription}>
                  Buy fractional ownership in properties with as little as $100
                </Text>
              </View>
            </View>
            <View style={styles.infoStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Earn Passive Income</Text>
                <Text style={styles.stepDescription}>
                  Receive your share of rental income and property appreciation
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  portfolioCard: {
    marginBottom: 24,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  portfolioStat: {
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
  viewPortfolioButton: {
    alignSelf: 'flex-start',
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.blue,
  },
  featuredListContainer: {
    marginLeft: -16,
    marginRight: -16,
  },
  featuredList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.secondary.gray,
    borderRadius: 16,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});