import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, CreditCard, Wallet, Coins } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { usePropertyStore } from '@/store/property-store';
import { Property } from '@/types';

export default function InvestScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { fetchPropertyById, investInProperty, isLoading } = usePropertyStore();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [tokenAmount, setTokenAmount] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto'>('card');
  
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
  
  const handleTokenAmountChange = (text: string) => {
    // Only allow numbers
    if (/^\d*$/.test(text)) {
      setTokenAmount(text);
    }
  };
  
  const decreaseTokens = () => {
    const currentAmount = parseInt(tokenAmount) || 0;
    if (currentAmount > 1) {
      setTokenAmount((currentAmount - 1).toString());
    }
  };
  
  const increaseTokens = () => {
    const currentAmount = parseInt(tokenAmount) || 0;
    if (property && currentAmount < property.availableTokens) {
      setTokenAmount((currentAmount + 1).toString());
    }
  };
  
  const calculateInvestmentAmount = () => {
    if (!property) return 0;
    return (parseInt(tokenAmount) || 0) * property.pricePerToken;
  };
  
  const handleInvest = async () => {
    if (!property) return;
    
    const amount = parseInt(tokenAmount);
    
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid token amount');
      return;
    }
    
    if (amount > property.availableTokens) {
      Alert.alert('Error', 'Not enough tokens available');
      return;
    }
    
    try {
      await investInProperty(property.id, amount);
      Alert.alert(
        'Investment Successful',
        `You have successfully invested in ${property.title}`,
        [
          {
            text: 'View Portfolio',
            onPress: () => router.push('/portfolio'),
          },
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  if (isLoading && !property) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.blue} />
      </View>
    );
  }
  
  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Property not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()}
          style={styles.errorButton}
        />
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Invest in Property' }} />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Invest in {property.title}</Text>
            <Text style={styles.subtitle}>
              Purchase tokens to own a share of this property
            </Text>
          </View>
          
          <Card style={styles.tokenSection}>
            <Text style={styles.sectionTitle}>Select Number of Tokens</Text>
            <Text style={styles.tokenPrice}>
              ${property.pricePerToken} <Text style={styles.perTokenText}>per token</Text>
            </Text>
            
            <View style={styles.tokenInputContainer}>
              <TouchableOpacity 
                style={styles.tokenButton}
                onPress={decreaseTokens}
              >
                <Minus size={20} color={colors.text.primary} />
              </TouchableOpacity>
              
              <TextInput
                style={styles.tokenInput}
                value={tokenAmount}
                onChangeText={handleTokenAmountChange}
                keyboardType="number-pad"
              />
              
              <TouchableOpacity 
                style={styles.tokenButton}
                onPress={increaseTokens}
              >
                <Plus size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.availableTokens}>
              {property.availableTokens.toLocaleString()} tokens available
            </Text>
          </Card>
          
          <Card style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Investment Summary</Text>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Number of Tokens</Text>
              <Text style={styles.summaryValue}>{parseInt(tokenAmount) || 0}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Price per Token</Text>
              <Text style={styles.summaryValue}>${property.pricePerToken}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Platform Fee (0%)</Text>
              <Text style={styles.summaryValue}>$0</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>
                ${calculateInvestmentAmount().toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.roiPreview}>
              <Coins size={20} color={colors.primary.green} />
              <Text style={styles.roiText}>
                Expected Annual Return: {property.roi}%
              </Text>
            </View>
          </Card>
          
          <Card style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            
            <View style={styles.paymentOptions}>
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'card' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('card')}
              >
                <CreditCard 
                  size={24} 
                  color={paymentMethod === 'card' ? colors.primary.blue : colors.text.secondary} 
                />
                <Text 
                  style={[
                    styles.paymentOptionText,
                    paymentMethod === 'card' && styles.paymentOptionTextSelected,
                  ]}
                >
                  Card
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'bank' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('bank')}
              >
                <Wallet 
                  size={24} 
                  color={paymentMethod === 'bank' ? colors.primary.blue : colors.text.secondary} 
                />
                <Text 
                  style={[
                    styles.paymentOptionText,
                    paymentMethod === 'bank' && styles.paymentOptionTextSelected,
                  ]}
                >
                  Bank
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentOption,
                  paymentMethod === 'crypto' && styles.paymentOptionSelected,
                ]}
                onPress={() => setPaymentMethod('crypto')}
              >
                <Coins 
                  size={24} 
                  color={paymentMethod === 'crypto' ? colors.primary.blue : colors.text.secondary} 
                />
                <Text 
                  style={[
                    styles.paymentOptionText,
                    paymentMethod === 'crypto' && styles.paymentOptionTextSelected,
                  ]}
                >
                  Crypto
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
          
          <Text style={styles.disclaimer}>
            By investing, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
          </Text>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button 
            title="Confirm Investment" 
            onPress={handleInvest}
            isLoading={isLoading}
            style={styles.investButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  errorButton: {
    minWidth: 200,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  tokenSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tokenPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  perTokenText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  tokenInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: colors.secondary.gray,
    borderRadius: 8,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  availableTokens: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  summarySection: {
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.secondary.gray,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.blue,
  },
  roiPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: `${colors.primary.green}10`,
    borderRadius: 8,
  },
  roiText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.green,
  },
  paymentSection: {
    marginBottom: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.secondary.gray,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  paymentOptionSelected: {
    borderColor: colors.primary.blue,
    backgroundColor: `${colors.primary.blue}10`,
  },
  paymentOptionText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text.secondary,
  },
  paymentOptionTextSelected: {
    color: colors.primary.blue,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.secondary.white,
    borderTopWidth: 1,
    borderTopColor: colors.secondary.gray,
  },
  investButton: {
    width: '100%',
  },
});