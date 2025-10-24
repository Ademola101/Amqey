import React from 'react';
import { StyleSheet, View, TextInput, TextInputProps } from 'react-native';
import Text from './Text';
import { theme } from '../../config/theme';


interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  required,
  style,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text variant="h6Bold" text={label} color={theme.colors.textPrimary} />
        {required && <Text variant="h6Bold" text=" *" color={theme.colors.accentPink} />}
      </View>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={theme.colors.textTertiary}
        {...props}
      />
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
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    fontSize: 16,
    fontFamily: 'Regular',
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  inputError: {
    borderColor: theme.colors.accentPink,
    backgroundColor: '#FFF5F7',
  },
  errorText: {
    marginTop: theme.spacing.s,
    marginLeft: theme.spacing.s,
  },
});