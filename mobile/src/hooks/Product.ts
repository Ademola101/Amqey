import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../../config/api";
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt: Date;
}
export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await api.get('/products');
      return response.data;
    },
  });
}

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
      const response = await api.post('/products', newProduct);
      return response.data;
    },
  });
}