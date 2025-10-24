import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Text from '../../../components/Text';
import { theme } from '../../../../config/theme';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { baseURL } from '../../../../config/api';

interface ImagePickerButtonProps {
  imageUrl?: string;
  onPress: () => void;
  isLoading?: boolean;
  error?: string;
}

export const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  imageUrl,
  onPress,
  isLoading,
  error,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.imagePickerContainer, error && styles.imagePickerError]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text
              variant="body2"
              text="Uploading..."
              color={theme.colors.textSecondary}
              style={styles.loadingText}
            />
          </View>
        ) : imageUrl ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: `${baseURL}/uploads/products/${imageUrl.split('/').pop()}` }} style={styles.imagePreview} />
            <View style={styles.changeImageOverlay}>
              <IonicIcon name="camera" size={24} color={theme.colors.white} />
              <Text variant="body2Bold" text="Change Image" color={theme.colors.white} />
            </View>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <View style={styles.iconCircle}>
              <IonicIcon name="image-outline" size={40} color={theme.colors.primary} />
            </View>
            <Text variant="h6Bold" text="Add Product Image" color={theme.colors.textPrimary} />
            <Text
              variant="body2"
              text="Tap to select from gallery"
              color={theme.colors.textSecondary}
              style={styles.placeholderSubtext}
            />
          </View>
        )}
      </TouchableOpacity>
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
  imagePickerContainer: {
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePickerError: {
    borderColor: theme.colors.accentPink,
    backgroundColor: '#FFF5F7',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
  },
  imagePreviewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changeImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  placeholderSubtext: {
    marginTop: theme.spacing.s,
  },
  errorText: {
    marginTop: theme.spacing.s,
    marginLeft: theme.spacing.s,
  },
});
