import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showPercentage = false,
  color = colors.primary.green,
  backgroundColor = colors.secondary.gray,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progressContainer, 
          { height, backgroundColor }
        ]}
      >
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${clampedProgress}%`,
              backgroundColor: color,
              height,
            }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>{Math.round(clampedProgress)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressContainer: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
});