import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, ShoppingBag } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function MarketplaceScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Marketplace</Text>
          <Text style={styles.subtitle}>
            Buy and sell property tokens on the secondary market
          </Text>
        </View>
        
        <View style={styles.comingSoonContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.comingSoonImage}
          />
          <View style={styles.comingSoonContent}>
            <ShoppingBag size={40} color={colors.primary.blue} />
            <Text style={styles.comingSoonTitle}>
              Marketplace Coming Soon
            </Text>
            <Text style={styles.comingSoonText}>
              Our secondary market for trading property tokens is under development. 
              Soon you'll be able to buy and sell tokens directly with other investors.
            </Text>
            <Button
              title="Join Waitlist"
              style={styles.waitlistButton}
            />
          </View>
        </View>
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Marketplace Features</Text>
          
          <View style={styles.featuresGrid}>
            <Card style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <ShoppingBag size={24} color={colors.primary.blue} />
              </View>
              <Text style={styles.featureTitle}>P2P Trading</Text>
              <Text style={styles.featureDescription}>
                Buy and sell tokens directly with other investors
              </Text>
            </Card>
            
            <Card style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Clock size={24} color={colors.primary.blue} />
              </View>
              <Text style={styles.featureTitle}>Real-time Pricing</Text>
              <Text style={styles.featureDescription}>
                Market-driven prices updated in real-time
              </Text>
            </Card>
            
            <Card style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <ShoppingBag size={24} color={colors.primary.blue} />
              </View>
              <Text style={styles.featureTitle}>Secure Transactions</Text>
              <Text style={styles.featureDescription}>
                Blockchain-powered security for all trades
              </Text>
            </Card>
            
            <Card style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <ShoppingBag size={24} color={colors.primary.blue} />
              </View>
              <Text style={styles.featureTitle}>Low Fees</Text>
              <Text style={styles.featureDescription}>
                Minimal transaction fees for maximum returns
              </Text>
            </Card>
          </View>
        </View>
        
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <Card style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              When will the marketplace launch?
            </Text>
            <Text style={styles.faqAnswer}>
              We're targeting a launch in Q3 2023. Join our waitlist to be notified when it's available.
            </Text>
          </Card>
          
          <Card style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              How will token pricing work?
            </Text>
            <Text style={styles.faqAnswer}>
              Token prices will be determined by market demand, property performance, and current valuation.
            </Text>
          </Card>
          
          <Card style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              Will there be trading fees?
            </Text>
            <Text style={styles.faqAnswer}>
              Yes, a small fee (1-2%) will apply to transactions to maintain the platform and ensure security.
            </Text>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  comingSoonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.secondary.white,
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  comingSoonImage: {
    width: '100%',
    height: 150,
  },
  comingSoonContent: {
    padding: 20,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  waitlistButton: {
    minWidth: 200,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: '47%',
    padding: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.primary.blue}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: 24,
  },
  faqCard: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});