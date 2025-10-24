import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../../config/theme';
import Text from '../../../components/Text';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProduct } from '../../../hooks/Product';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadImage } from '../../../hooks/Upload';
import * as ImagePicker from 'expo-image-picker';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { ImagePickerButton } from './ImagePickerButton';
import { InputField } from '../../../components/InputField';
import { PickerField } from '../../../components/PickerField';
import { SwitchField } from '../../../components/SwitchField';
import { useNavigation } from '@react-navigation/native';
import { useToastMessage } from '../../../hooks/useToastMessage';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Home', value: 'Home' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Books', value: 'Books' },
  { label: 'Toys', value: 'Toys' },
  { label: 'Food', value: 'Food' },
  { label: 'Other', value: 'Other' },
];

const AddProduct = () => {
    const { showToast } = useToastMessage();
    const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { mutate: addProduct, isPending } = useAddProduct();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImage();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      inStock: true,
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const image = result.assets[0];
      setImageError('');
      
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: 'product_image.jpg',
          type: 'image/jpeg',
        } as any);

        uploadImage(formData, {
          onSuccess: (url: string) => {
            console.log('Image uploaded to:', url);
            setImageUrl(url);
          },
          onError: () => {
            showToast('Image upload failed. Please try again.', 'danger');
          },
        });
    }
  };

  const onSubmit = (data: ProductFormData) => {
    if (!imageUrl) {
      setImageError('Product image is required');
      return;
    }

    const productData = {
      ...data,
      imageUrl,
    };

    addProduct(productData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        
        reset();
        setImageUrl('');
        showToast('Product added successfully', 'success');
        navigation.goBack();

      },
      onError: (error) => {
        showToast('Failed to add product. Please try again.', 'danger');
        console.error('Add product error:', error);
      },
    });
  };

  const isSubmitting = isPending || isUploadingImage;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.lg }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack(); }}>
          <IonicIcon name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h4" text="Add New Product" color={theme.colors.textPrimary} />
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xxlg },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text
            variant="h5Bold"
            text="Product Image"
            color={theme.colors.textPrimary}
            style={styles.sectionTitle}
          />
          <ImagePickerButton
            imageUrl={imageUrl}
            onPress={pickImage}
            isLoading={isUploadingImage}
            error={imageError}
          />
        </View>

        <View style={styles.section}>
          <Text
            variant="h5Bold"
            text="Product Details"
            color={theme.colors.textPrimary}
            style={styles.sectionTitle}
          />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Product Name"
                required
                placeholder="Enter product name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Description"
                required
                placeholder="Enter product description"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.description?.message}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Price"
                required
                placeholder="0.00"
                value={value === 0 ? '' : value.toString()}
                onChangeText={(text) => {
                  const numValue = parseFloat(text) || 0;
                  onChange(numValue);
                }}
                onBlur={onBlur}
                error={errors.price?.message}
                keyboardType="decimal-pad"
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <PickerField
                label="Category"
                required
                value={value}
                onValueChange={onChange}
                items={categories}
                error={errors.category?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="inStock"
            render={({ field: { onChange, value } }) => (
              <SwitchField
                label="In Stock"
                description="Toggle availability status"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <>
              <IonicIcon name="checkmark-circle" size={20} color={theme.colors.white} />
              <Text variant="h6Bold" text="Add Product" color={theme.colors.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xxlg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.lg,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.lg,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.textTertiary,
    shadowOpacity: 0,
    elevation: 0,
  },
});