import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../../components/Text';
import { theme } from '../../../../config/theme';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../config/styles';

interface HomeHeaderProps {
  onAddPress: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onAddPress }) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style= {[headerStyles.header, { paddingTop: insets.top + theme.spacing.md }]}>
      <View>
        <Text 
          variant="body2" 
          text="Welcome back" 
          color={theme.colors.textSecondary} 
        />
        <Text 
          variant="h3" 
          text="My Products" 
          color={theme.colors.textPrimary}
          style={headerStyles.headerTitle}
        />
      </View>
      <TouchableOpacity 
        style={headerStyles.addButton}
        onPress={onAddPress}
        activeOpacity={0.8}
      >
        <IonicIcon name="add" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xlg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    marginTop: theme.spacing.s,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});