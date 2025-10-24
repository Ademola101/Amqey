import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Text from './Text';
import { theme } from '../../config/theme';

interface PickerFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  error?: string;
  required?: boolean;
}

export const PickerField: React.FC<PickerFieldProps> = ({
  label,
  value,
  onValueChange,
  items,
  error,
  required,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.labelContainer}>
        <Text variant="h6Bold" text={label} color={theme.colors.textPrimary} />
        {required && <Text variant="h6Bold" text=" *" color={theme.colors.accentPink} />}
      </View>
      <View style={[styles.pickerWrapper, error && styles.pickerError]}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => {
            console.log('Picker value changed:', itemValue);
            onValueChange(itemValue);
          }}
          style={styles.picker}
          itemStyle={Platform.OS === 'ios' ? styles.pickerItem : undefined}
          mode="dropdown"
        >
          <Picker.Item 
            label="Select a category" 
            value="" 
            color={theme.colors.textTertiary}
          />
          {items.map((item) => (
            <Picker.Item 
              key={item.value} 
              label={item.label} 
              value={item.value}
              color={theme.colors.textPrimary}
            />
          ))}
        </Picker>
      </View>
      {error && (
        <Text
          variant="body2"
          text={error}
          color={theme.colors.accentPink}
          style={styles.errorText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: theme.spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },
  pickerError: {
    borderColor: theme.colors.accentPink,
    backgroundColor: '#FFF5F7',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 56,
    width: '100%',
  },
  pickerItem: {
    height: 200,
  },
  errorText: {
    marginTop: theme.spacing.s,
    marginLeft: theme.spacing.s,
  },
});