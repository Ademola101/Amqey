import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios";
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