import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../config/theme';
import Text from '../../components/Text';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteProduct, useGetProductById, useUpdateProduct } from '../../hooks/Product';
import { useQueryClient } from '@tanstack/react-query';
import { useUploadImage } from '../../hooks/Upload';
import * as ImagePicker from 'expo-image-picker';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { InputField } from '../../components/InputField';
import { PickerField } from '../../components/PickerField';
import { SwitchField } from '../../components/SwitchField';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToastMessage } from '../../hooks/useToastMessage';
import { ProductCardSkeleton } from './Home/ProductSkeleton';
import { ImagePickerButton } from './AddProduct/ImagePickerButton';
import { categories } from '../../utils/categories';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

type RouteParams = {
  productId: string;
};



const ProductDetails = () => {
  const { showToast } = useToastMessage();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as RouteParams;
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useGetProductById(params.productId);
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImage();

  const [isEditMode, setIsEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        inStock: product.inStock,
      });
      setImageUrl(product.imageUrl);
    }
  }, [product, reset]);

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
          setImageUrl(url);
          showToast('Image uploaded successfully', 'success');
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
    // @ts-expect-error: 
    updateProduct(data,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
          queryClient.invalidateQueries({ queryKey: ['product', params.productId] });
          setIsEditMode(false);
          showToast('Product updated successfully', 'success');
        },
        onError: (error) => {
          showToast('Failed to update product. Please try again.', 'danger');
          console.error('Update product error:', error);
        },
      }
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProduct(params.productId, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] });
                showToast('Product deleted successfully', 'success');
                navigation.goBack();
              },
              onError: () => {
                showToast('Failed to delete product. Please try again.', 'danger');
              },
            });
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        inStock: product.inStock,
      });
      setImageUrl(product.imageUrl);
    }
    setIsEditMode(false);
  };

  const isSubmitting = isUpdating || isUploadingImage;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + theme.spacing.lg }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <IonicIcon name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text variant="h4" text="Product Details" color={theme.colors.textPrimary} />
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ProductCardSkeleton />
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + theme.spacing.lg }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <IonicIcon name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text variant="h4" text="Product Details" color={theme.colors.textPrimary} />
          <View style={styles.placeholder} />
        </View>
        <View style={styles.emptyContainer}>
          <IonicIcon name="alert-circle-outline" size={64} color={theme.colors.textTertiary} />
          <Text variant="h5Bold" text="Product Not Found" color={theme.colors.textPrimary} style={styles.emptyTitle} />
          <Text variant="body1" text="The product you're looking for doesn't exist." color={theme.colors.textSecondary} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.lg }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IonicIcon name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h4" text={isEditMode ? 'Edit Product' : 'Product Details'} color={theme.colors.textPrimary} />
        {!isEditMode && (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
            <IonicIcon name="create-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        {isEditMode && <View style={styles.placeholder} />}
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
        {!isEditMode ? (
          // View Mode
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="cover" />
              <View style={[styles.stockBadge, product.inStock ? styles.inStockBadge : styles.outOfStockBadge]}>
                <IonicIcon
                  name={product.inStock ? 'checkmark-circle' : 'close-circle'}
                  size={16}
                  color={theme.colors.white}
                />
                <Text
                  variant="body1"
                  text={product.inStock ? 'In Stock' : 'Out of Stock'}
                  color={theme.colors.white}
                  style={styles.stockText}
                />
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.priceRow}>
                <Text variant="h3" text={`$${product.price.toFixed(2)}`} color={theme.colors.primary} />
                <View style={styles.categoryBadge}>
                  <Text variant="body2Bold" text={product.category} color={theme.colors.primary} />
                </View>
              </View>

              <Text variant="h4" text={product.name} color={theme.colors.textPrimary} style={styles.productName} />

              <View style={styles.divider} />

              <View style={styles.descriptionSection}>
                <Text variant="h6Bold" text="Description" color={theme.colors.textPrimary} style={styles.sectionLabel} />
                <Text variant="body1" text={product.description} color={theme.colors.textSecondary} style={styles.description} />
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <IonicIcon name="pricetag-outline" size={20} color={theme.colors.textTertiary} />
                  <Text variant="body2" text="Category" color={theme.colors.textTertiary} style={styles.infoLabel} />
                  <Text variant="body1" text={product.category} color={theme.colors.textPrimary} />
                </View>
                <View style={styles.infoItem}>
                  <IonicIcon name="cube-outline" size={20} color={theme.colors.textTertiary} />
                  <Text variant="body2" text="Status" color={theme.colors.textTertiary} style={styles.infoLabel} />
                  <Text variant="body1" text={product.inStock ? 'Available' : 'Unavailable'} color={theme.colors.textPrimary} />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              disabled={isDeleting}
              activeOpacity={0.8}
            >
              {isDeleting ? (
                <ActivityIndicator color={theme.colors.white} />
              ) : (
                <>
                  <IonicIcon name="trash-outline" size={20} color={theme.colors.white} />
                  <Text variant="h6Bold" text="Delete Product" color={theme.colors.white} />
                </>
              )}
            </TouchableOpacity>
          </>
        ) : (
          // Edit Mode
          <>
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
          </>
        )}
      </ScrollView>

      {isEditMode && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text variant="h6Bold" text="Cancel" color={theme.colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <>
                <IonicIcon name="checkmark-circle" size={20} color={theme.colors.white} />
                <Text variant="h6Bold" text="Save Changes" color={theme.colors.white} />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ProductDetails;

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
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxlg,
  },
  emptyTitle: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  stockBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 20,
    gap: theme.spacing.s,
  },
  inStockBadge: {
    backgroundColor: theme.colors.success,
  },
  outOfStockBadge: {
    backgroundColor: theme.colors.accentPink,
  },
  stockText: {
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: theme.spacing.xlg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  categoryBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: 20,
  },
  productName: {
    marginBottom: theme.spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
  descriptionSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    marginBottom: theme.spacing.md,
  },
  description: {
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  infoItem: {
    flex: 1,
    gap: theme.spacing.s,
  },
  infoLabel: {
    marginTop: theme.spacing.s,
  },
  deleteButton: {
    backgroundColor: theme.colors.accentPink,
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    shadowColor: theme.colors.accentPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.border,
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    flex: 2,
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
  saveButtonDisabled: {
    backgroundColor: theme.colors.textTertiary,
    shadowOpacity: 0,
    elevation: 0,
  },
});