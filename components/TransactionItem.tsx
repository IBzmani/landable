import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Building2, 
  DollarSign, 
  ShoppingCart 
} from 'lucide-react-native';
import { Transaction } from '@/types';
import { colors } from '@/constants/colors';
import { Badge } from './ui/Badge';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'deposit':
        return <ArrowDownToLine size={20} color={colors.status.success} />;
      case 'withdrawal':
        return <ArrowUpFromLine size={20} color={colors.status.warning} />;
      case 'investment':
        return <Building2 size={20} color={colors.primary.blue} />;
      case 'earning':
        return <DollarSign size={20} color={colors.primary.green} />;
      case 'sale':
        return <ShoppingCart size={20} color={colors.status.info} />;
      default:
        return null;
    }
  };
  
  const getTypeLabel = () => {
    switch (transaction.type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'investment':
        return 'Investment';
      case 'earning':
        return 'Earning';
      case 'sale':
        return 'Sale';
      default:
        return '';
    }
  };
  
  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'completed':
        return <Badge label="Completed" variant="success" />;
      case 'pending':
        return <Badge label="Pending" variant="warning" />;
      case 'failed':
        return <Badge label="Failed" variant="error" />;
      default:
        return null;
    }
  };
  
  const getAmountColor = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'earning':
        return colors.status.success;
      case 'withdrawal':
      case 'investment':
        return colors.status.warning;
      case 'sale':
        return colors.status.info;
      default:
        return colors.text.primary;
    }
  };
  
  const getAmountPrefix = () => {
    switch (transaction.type) {
      case 'deposit':
      case 'earning':
      case 'sale':
        return '+';
      case 'withdrawal':
      case 'investment':
        return '-';
      default:
        return '';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>{getTypeLabel()}</Text>
          <Text 
            style={[styles.amount, { color: getAmountColor() }]}
          >
            {getAmountPrefix()}${transaction.amount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.date}>{transaction.date}</Text>
          <View style={styles.statusContainer}>
            {getStatusBadge()}
          </View>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.details}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.gray,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.blue}10`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusContainer: {},
  description: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});