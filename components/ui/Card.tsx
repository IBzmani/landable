import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style,
  variant = 'default'
}) => {
  return (
    <View style={[styles.card, styles[`${variant}Card`], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.secondary.white,
  },
  defaultCard: {
    backgroundColor: colors.secondary.white,
  },
  elevatedCard: {
    backgroundColor: colors.secondary.white,
    shadowColor: colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.secondary.gray,
  },
});