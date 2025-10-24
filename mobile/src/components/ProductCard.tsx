import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ViewStyle } from 'react-native';


import Text from './Text';
import { theme } from '../../config/theme';
import { baseURL } from '../../config/api';
import { formatToMoney } from '../utils/formatToMoney';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt: Date;
}

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
  style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, style]}
      onPress={() => onPress?.(product)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          // @ts-ignore
          source={{ uri: `${baseURL}/uploads/products/${product?.imageUrl.split('/').pop()}` }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text 
              variant="body3Bold" 
              text="Out of Stock" 
              color={theme.colors.white}
            />
          </View>
        )}
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.categoryBadge}>
          <Text 
            variant="body3Bold" 
            text={product.category} 
            color={theme.colors.primary}
          />
        </View>
        
        <Text 
          variant="h6Bold" 
          text={product.name} 
          style={styles.productName}
        />
        
        <Text 
          variant="body2" 
          text={product.description} 
          color={theme.colors.textSecondary}
          style={styles.description}
          lines={2}
        />
        
        <View style={styles.priceRow}>
          <Text 
            variant="h5Bold" 
            text={formatToMoney(product.price)}
            color={theme.colors.black}
          />
          {product.inStock && (
            <View style={styles.inStockIndicator}>
              <View style={styles.inStockDot} />
              <Text 
                variant="body3Bold" 
                text="In Stock" 
                color={theme.colors.success}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.border,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.accentPink,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.s,
    borderRadius: 8,
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  categoryBadge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.s,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  productName: {
    marginBottom: theme.spacing.s,
  },
  description: {
    marginBottom: theme.spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inStockIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inStockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 4,
  },
});