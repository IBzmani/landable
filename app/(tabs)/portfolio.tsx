import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { PortfolioSummary } from '@/components/PortfolioSummary';
import { InvestmentCard } from '@/components/InvestmentCard';
import { TransactionItem } from '@/components/TransactionItem';
import { usePropertyStore } from '@/store/property-store';

type TabType = 'investments' | 'transactions';

export default function PortfolioScreen() {
  const { 
    portfolio, 
    transactions,
    fetchPortfolio, 
    fetchTransactions,
    isLoading 
  } = usePropertyStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('investments');
  
  useEffect(() => {
    fetchPortfolio();
    fetchTransactions();
  }, []);
  
  const handleRefresh = () => {
    fetchPortfolio();
    fetchTransactions();
  };
  
  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab && styles.activeTabButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {isLoading && portfolio.investments.length === 0 && transactions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.blue} />
        </View>
      ) : (
        <FlatList
          data={activeTab === 'investments' ? portfolio.investments : transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            activeTab === 'investments' 
              ? <InvestmentCard investment={item} />
              : <TransactionItem transaction={item} />
          }
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Your Portfolio</Text>
              </View>
              
              <PortfolioSummary portfolio={portfolio} />
              
              <View style={styles.tabsContainer}>
                {renderTabButton('investments', 'Investments')}
                {renderTabButton('transactions', 'Transactions')}
              </View>
            </>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {activeTab === 'investments' 
                  ? 'No investments yet' 
                  : 'No transactions yet'}
              </Text>
              <Text style={styles.emptySubtext}>
                {activeTab === 'investments'
                  ? 'Start investing in properties to build your portfolio'
                  : 'Your transaction history will appear here'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.white,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.primary.blue,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabButtonText: {
    color: colors.primary.blue,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.secondary.gray,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});