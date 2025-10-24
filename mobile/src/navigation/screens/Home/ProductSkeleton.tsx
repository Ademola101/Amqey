import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonLoadingView from '../../../components/skeleton-loading';
import { theme } from '../../../../config/theme';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={skeletonStyles.skeletonCard}>
      <SkeletonLoadingView
        config={[
          { width: '100%', height: 200, borderRadius: 0, marginBottom: 0 },
        ]}
      />
      <View style={skeletonStyles.skeletonContent}>
        <SkeletonLoadingView
          config={[
            { width: '40%', height: 20, borderRadius: 6, marginBottom: 12 },
            { width: '80%', height: 22, borderRadius: 4, marginBottom: 8 },
            { width: '100%', height: 16, borderRadius: 4, marginBottom: 16 },
            { width: '50%', height: 20, borderRadius: 4 },
          ]}
        />
      </View>
    </View>
  );
};

const skeletonStyles = StyleSheet.create({
  skeletonCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  skeletonContent: {
    padding: theme.spacing.lg,
  },
});