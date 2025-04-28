import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'small',
}) => {
  return (
    <View style={[styles.badge, styles[`${variant}Badge`], styles[`${size}Badge`]]}>
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  
  // Variants
  primaryBadge: {
    backgroundColor: `${colors.primary.blue}20`,
  },
  primaryText: {
    color: colors.primary.blue,
  },
  
  successBadge: {
    backgroundColor: `${colors.status.success}20`,
  },
  successText: {
    color: colors.status.success,
  },
  
  warningBadge: {
    backgroundColor: `${colors.status.warning}20`,
  },
  warningText: {
    color: colors.status.warning,
  },
  
  errorBadge: {
    backgroundColor: `${colors.status.error}20`,
  },
  errorText: {
    color: colors.status.error,
  },
  
  infoBadge: {
    backgroundColor: `${colors.status.info}20`,
  },
  infoText: {
    color: colors.status.info,
  },
  
  // Sizes
  smallBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  smallText: {
    fontSize: 10,
  },
  
  mediumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  mediumText: {
    fontSize: 12,
  },
});