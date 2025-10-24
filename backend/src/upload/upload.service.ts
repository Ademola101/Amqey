import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private uploadPath: string;

  constructor(private configService: ConfigService) {
    // Store uploads in 'uploads' folder at project root
    this.uploadPath = path.join(process.cwd(), 'uploads', 'products');
    this.ensureUploadDirectory();
  }

  private ensureUploadDirectory() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only image files (JPEG, PNG, WebP) are allowed',
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    try {
      // Ensure we always have a valid extension (fallback to 'bin' if none)
      const fileExtension = file.originalname.split('.').pop() || 'bin';
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = path.join(this.uploadPath, fileName);

      // Write file to disk asynchronously
      await fs.promises.writeFile(filePath, file.buffer);

      // Get server URL from config or use default
      const serverUrl = this.configService.get<string>(
        'SERVER_URL',
        'http://localhost:3000',
      );
      const fileUrl = `${serverUrl}/uploads/products/${fileName}`;

      return fileUrl;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : String(error);
      throw new BadRequestException(`Failed to upload file: ${message}`);
    }
  }
  deleteFile(imageUrl: string): void {
    try {
      // Extract filename from URL
      const fileName = imageUrl.split('/').pop();
      if (!fileName) {
        // nothing to delete
        return;
      }
      const filePath = path.join(this.uploadPath, fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
