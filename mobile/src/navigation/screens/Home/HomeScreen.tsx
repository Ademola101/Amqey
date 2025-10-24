import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../../config/theme';
import { useGetProducts } from '../../../hooks/Product';

import { HomeHeader } from './HomeHeader';
import { EmptyState } from './EmptyState';
import type { Product } from '../../../hooks/Product';
import { ProductCard } from '../../../components/ProductCard';
import { ProductCardSkeleton } from './ProductSkeleton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { data: products, isLoading } = useGetProducts();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleAddProduct = () => {
    navigation.navigate('AddProduct' as never);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails' as never, { productId: product.id } as never );
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} onPress={handleProductPress} />
  );

  const renderEmpty = () => <EmptyState onAddPress={handleAddProduct} />;

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader onAddPress={handleAddProduct} />
      
      {isLoading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            (!products || products.length === 0) && styles.listContentEmpty,
            { paddingBottom: insets.bottom + theme.spacing.lg }
          ]}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  skeletonContainer: {
    padding: theme.spacing.lg,
  },
});