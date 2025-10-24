import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from '../../../components/Text';
import { theme } from '../../../../config/theme';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../config/styles';

interface EmptyStateProps {
  onAddPress: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddPress }) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <IonicIcon name="cube-outline" size={64} color={theme.colors.textTertiary} />
      </View>
      <Text 
        variant="h4" 
        text="No Products Yet" 
        color={theme.colors.textPrimary}
        style={styles.emptyTitle}
      />
      <Text 
        variant="body1" 
        text="Start building your inventory by adding your first product"
        color={theme.colors.textSecondary}
        style={styles.emptyDescription}
        align="center"
      />
      <TouchableOpacity 
        style={styles.emptyStateButton}
        onPress={onAddPress}
        activeOpacity={0.8}
      >
        <IonicIcon 
          name="add-circle-outline" 
          size={20} 
          color={theme.colors.white}
          
        />
        <Text variant="h6Bold" text="Add Product" color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const emptyStyles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxlg,
    paddingVertical: theme.spacing.xxlg * 2,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xlg,
  },
  emptyTitle: {
    marginBottom: theme.spacing.md,
  },
  emptyDescription: {
    marginBottom: theme.spacing.xxlg,
    paddingHorizontal: theme.spacing.lg,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxlg,
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: theme.spacing.md,
  },
});