import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploadService } from '../upload/upload.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Map<string, Product> = new Map();

  constructor(private uploadService: UploadService) {}

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: uuidv4(),
      ...createProductDto,
      inStock: createProductDto.inStock ?? true,
      createdAt: new Date(),
    };

    this.products.set(product.id, product);
    return product;
  }

  findAll(): Product[] {
    return Array.from(this.products.values());
  }

  findOne(id: string): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);

    const updatedProduct = {
      ...product,
      ...updateProductDto,
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  delete(id: string): void {
    const product = this.findOne(id);

    // Delete associated image if exists
    if (product.imageUrl) {
      this.uploadService.deleteFile(product.imageUrl);
    }

    this.products.delete(id);
  }

  findByCategory(category: string): Product[] {
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  findInStock(): Product[] {
    return Array.from(this.products.values()).filter(
      (product) => product.inStock,
    );
  }
}
