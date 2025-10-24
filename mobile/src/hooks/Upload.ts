import { useMutation } from "@tanstack/react-query";
import api from "../../config/api";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (imageData: FormData): Promise<string> => {
      const response = await api.post('/upload/image', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    },
  });
}