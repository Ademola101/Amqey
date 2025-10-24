# 🚀 Product Inventory Backend API

**Product Inventory Backend** is a RESTful API built with **NestJS** and **TypeScript**.  
It provides endpoints for managing product inventory with in-memory storage, including CRUD operations, file uploads, and filtering capabilities.

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Exposing with ngrok](#-exposing-with-ngrok)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)

---

## ✨ Features

- ✅ **CRUD Operations** for product management
- ✅ **In-Memory Storage** - no database required
- ✅ **File Upload** support for product images
- ✅ **Filtering** by category and stock status
- ✅ **TypeScript** for type safety
- ✅ **DTO Validation** using class-validator
- ✅ **RESTful API** design

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **ngrok** - For tunneling (required for mobile app development) - [Download here](https://ngrok.com/)

---

## 📦 Installation

### 1. **Navigate to the backend directory**
```bash
   cd backend
```

### 2. **Install dependencies**

   Install all required packages:
```bash
   npm install
   # or
   yarn install
```

   This will install:
   - NestJS framework and core modules
   - Validation libraries (class-validator, class-transformer)
   - File upload dependencies (multer)
```bash
   npm install
   # or
   yarn install
```

   This will install:
   - NestJS framework and core modules
   - Validation libraries (class-validator, class-transformer)
   - File upload dependencies (multer)
   - All other required packages

---

## 🏃 Running the Application

### 1. **Start the development server**
```bash
   npm run start:dev
   # or
   yarn start:dev
```

   The server will start on `http://localhost:3000` by default.

   You should see output similar to:
```
   [Nest] 12345  - LOG [NestFactory] Starting Nest application...
   [Nest] 12345  - LOG [InstanceLoader] AppModule dependencies initialized
   [Nest] 12345  - LOG [NestApplication] Nest application successfully started
   [Nest] 12345  - LOG Application is running on: http://localhost:3000
```

### 2. **Verify the server is running**

   Open your browser or API client (Postman, Insomnia) and visit:
```
   http://localhost:3000/products
```

   You should receive an empty array `[]` or sample products if any are pre-loaded.

---

## 🌐 Exposing with ngrok (Required for Mobile App Development)

To connect your React Native mobile app to this backend, you **must** expose your local server using **ngrok**.

### 1. **Install ngrok**

   - Visit [ngrok.com](https://ngrok.com/) and sign up for a free account
   - Download and install ngrok for your operating system
   - Authenticate ngrok with your auth token:
```bash
     ngrok authtoken YOUR_AUTH_TOKEN
```

### 2. **Start ngrok tunnel**

   ⚠️ **IMPORTANT:** Make sure your NestJS server is running first!

   Open a **new terminal window** (keep your NestJS server running in the first terminal) and run:
```bash
   ngrok http 3000
```

   You should see output like:
```
   ngrok                                                                    
   
   Session Status                online
   Account                       your-email@example.com
   Version                       3.x.x
   Region                        United States (us)
   Forwarding                    https://b711274bcd9c.ngrok-free.app -> http://localhost:3000
   
   Connections                   ttl     opn     rt1     rt5     p50     p90
                                 0       0       0.00    0.00    0.00    0.00
```

### 3. **Copy the ngrok URL**

   Copy the **HTTPS forwarding URL** (e.g., `https://b711274bcd9c.ngrok-free.app`)

### 4. **Update the mobile app configuration**

   In your React Native app, update `/config/api.ts` with the ngrok URL:
```typescript
   import axios from 'axios';
   
   export const baseURL = 'https://b711274bcd9c.ngrok-free.app';
   
   const api = axios.create({
     baseURL: 'https://b711274bcd9c.ngrok-free.app',
     timeout: 10000, 
   });
   
   export default api;
```

### 5. **Test the connection**

   Visit the ngrok URL in your browser:
```
   https://b711274bcd9c.ngrok-free.app/products
```

   You should see the same response as your local server.

   > ⚠️ **Important Notes:**
   > - Keep **BOTH** the NestJS server AND ngrok running during development
   > - Each time you restart ngrok, you'll get a **new URL** - update your mobile app's `/config/api.ts` accordingly
   > - Free ngrok URLs expire after 2 hours of inactivity
   > - ngrok URLs change every time you restart ngrok (unless you use a paid plan for persistent URLs)
   > - Never commit ngrok URLs to version control

---

## 📚 API Documentation

### Base URL
```
Local Development: http://localhost:3000
Mobile Development (ngrok): https://your-ngrok-url.ngrok-free.app
```

### Endpoints

#### **Products**

##### **Create Product**
```http
POST /products
Content-Type: application/json

Request Body:
{
  "name": "Samsung Galaxy S21",
  "description": "Latest Samsung smartphone with 5G",
  "price": 799.99,
  "category": "Electronics",
  "quantity": 50,
  "imageUrl": "https://example.com/galaxy-s21.jpg"
}

Response: 201 Created
{
  "id": "uuid-here",
  "name": "Samsung Galaxy S21",
  "description": "Latest Samsung smartphone with 5G",
  "price": 799.99,
  "category": "Electronics",
  "quantity": 50,
  "imageUrl": "https://example.com/galaxy-s21.jpg",
  "createdAt": "2025-10-24T10:30:00.000Z"
}
```

##### **Get All Products**
```http
GET /products

Response: 200 OK
[
  {
    "id": "uuid-1",
    "name": "Samsung Galaxy S21",
    "description": "Latest Samsung smartphone with 5G",
    "price": 799.99,
    "category": "Electronics",
    "quantity": 50,
    "imageUrl": "https://example.com/galaxy-s21.jpg",
    "createdAt": "2025-10-24T10:30:00.000Z"
  },
  {
    "id": "uuid-2",
    "name": "Nike Air Max",
    "description": "Comfortable running shoes",
    "price": 129.99,
    "category": "Footwear",
    "quantity": 30,
    "imageUrl": "https://example.com/nike-air-max.jpg",
    "createdAt": "2025-10-24T11:00:00.000Z"
  }
]
```

##### **Filter Products by Category**
```http
GET /products?category=Electronics

Response: 200 OK
[
  {
    "id": "uuid-1",
    "name": "Samsung Galaxy S21",
    "category": "Electronics",
    ...
  }
]
```

##### **Filter Products in Stock**
```http
GET /products?inStock=true

Response: 200 OK
# Returns all products with quantity > 0
```

##### **Get Product by ID**
```http
GET /products/:id

Response: 200 OK
{
  "id": "uuid-1",
  "name": "Samsung Galaxy S21",
  "description": "Latest Samsung smartphone with 5G",
  "price": 799.99,
  "category": "Electronics",
  "quantity": 50,
  "imageUrl": "https://example.com/galaxy-s21.jpg",
  "createdAt": "2025-10-24T10:30:00.000Z"
}

Response: 404 Not Found (if product doesn't exist)
{
  "statusCode": 404,
  "message": "Product not found"
}
```

##### **Update Product**
```http
PUT /products/:id
Content-Type: application/json

Request Body:
{
  "name": "Samsung Galaxy S21 Ultra",
  "price": 899.99,
  "quantity": 45
}

Response: 200 OK
{
  "id": "uuid-1",
  "name": "Samsung Galaxy S21 Ultra",
  "description": "Latest Samsung smartphone with 5G",
  "price": 899.99,
  "category": "Electronics",
  "quantity": 45,
  "imageUrl": "https://example.com/galaxy-s21.jpg",
  "updatedAt": "2025-10-24T12:00:00.000Z"
}
```

##### **Delete Product**
```http
DELETE /products/:id

Response: 204 No Content
```

---

#### **File Upload**

##### **Upload Product Image**
```http
POST /upload
Content-Type: multipart/form-data

Form Data:
- file: [select image file]

Response: 200 OK
{
  "url": "http://localhost:3000/uploads/1234567890-product-image.jpg",
  "filename": "1234567890-product-image.jpg",
  "path": "/uploads/1234567890-product-image.jpg"
}
```

**Notes:**
- Accepted file types: `.jpg`, `.jpeg`, `.png`, `.gif`
- Maximum file size: 5MB
- Files are stored in the `uploads/` directory
- Use the returned `url` as the `imageUrl` when creating/updating products

---


---

## 💾 In-Memory Storage

This application uses **in-memory storage** for simplicity:

- ✅ **No database setup required** - start developing immediately
- ✅ **Fast operations** - all data in RAM
- ⚠️ **Data is temporary** - all products are **lost when the server restarts**
- ⚠️ **Not suitable for production** - use a real database (MongoDB, PostgreSQL, etc.) for production

**What this means:**
- Products you create will only exist while the server is running
- Restarting the server clears all products
- Perfect for development and testing
- Consider adding database integration for production use

---

## 🧪 Testing the API

### Using cURL
```bash
# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 99.99,
    "category": "Test",
    "quantity": 10
  }'

# Get all products
curl http://localhost:3000/products

# Get product by ID
curl http://localhost:3000/products/YOUR_PRODUCT_ID

# Update a product
curl -X PUT http://localhost:3000/products/YOUR_PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99}'

# Delete a product
curl -X DELETE http://localhost:3000/products/YOUR_PRODUCT_ID
```

### Using Postman or Insomnia

1. Import the endpoints listed in the API Documentation
2. Set the base URL to `http://localhost:3000` or your ngrok URL
3. Test each endpoint with sample data

---

## 🔨 Development Scripts
```bash
# Start development server with hot reload
npm run start:dev

```

