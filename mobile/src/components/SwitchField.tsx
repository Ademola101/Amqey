import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import Text from '../components/Text';
import { theme } from '../../config/theme';


interface SwitchFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  value,
  onValueChange,
  description,
}) => {
  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchContent}>
        <View style={styles.switchTextContainer}>
          <Text variant="h6Bold" text={label} color={theme.colors.textPrimary} />
          {description && (
            <Text
              variant="body2"
              text={description}
              color={theme.colors.textSecondary}
              style={styles.switchDescription}
            />
          )}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
          thumbColor={value ? theme.colors.primary : theme.colors.textTertiary}
          ios_backgroundColor={theme.colors.border}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  switchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextContainer: {
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  switchDescription: {
    marginTop: theme.spacing.s,
  },
});
