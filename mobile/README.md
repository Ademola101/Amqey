# 📦 Product Inventory

A React Native mobile application for managing product inventory, built with Expo and TypeScript. This app allows users to view, add, update, and delete products by connecting to a backend API.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (npm comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Expo Go** app on your mobile device (iOS/Android) - Optional for testing
- **Android Studio** or **Xcode** - Optional, for running on emulators/simulators

### Installation

#### 1. **Clone the repository**

   Open your terminal and run:
```bash
   git clone https://github.com/Ademola101/Amqey
   cd mobile
```

#### 2. **Install dependencies**

   Install all required packages using npm or yarn:
```bash
   npm install
   # or
   yarn install
```

   This will install:
   - React Native and Expo dependencies
   - React Navigation packages
   - Axios for API requests
   - All other required libraries

#### 3. **Configure the Backend Connection**

   This app connects to a backend API located in the same repository. For development, you'll need to tunnel your local backend using **ngrok**.

   **Steps to set up backend connection:**

   a. **Start your backend server** (refer to backend documentation in this repo)

   b. **Install ngrok** (if not already installed):
      - Visit [ngrok.com](https://ngrok.com/) and create a free account
      - Download and install ngrok for your operating system
      - Authenticate ngrok: `ngrok authtoken YOUR_AUTH_TOKEN`

   c. **Tunnel your backend** using ngrok:
```bash
      ngrok http 3000
      # Replace 3000 with your backend port number
```

   d. **Copy the ngrok URL** from the terminal output (e.g., `https://b711274bcd9c.ngrok-free.app`)

   e. **Update the API configuration**:
      - Open `/config/api.ts` in your code editor
      - Replace the `baseURL` with your ngrok URL:
```typescript
      import axios from 'axios';
      
      export const baseURL = 'https://YOUR-NGROK-URL.ngrok-free.app';
      
      const api = axios.create({
        baseURL: 'https://YOUR-NGROK-URL.ngrok-free.app',
        timeout: 10000, 
      });
      
      export default api;
```

   > ⚠️ **Important:** Each time you restart ngrok, you'll get a new URL. Remember to update the `baseURL` in `/config/api.ts` accordingly.

#### 4. **Start the development server**

   Run the Expo development server:
```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
```

   This will start the Metro bundler and display a QR code in your terminal.

#### 5. **Run on your device or simulator**

   Choose one of the following options:

   - **Expo Go (Easiest for beginners):**
     - Install the Expo Go app on your [iOS](https://apps.apple.com/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device
     - Scan the QR code displayed in your terminal with your device camera (iOS) or Expo Go app (Android)
     - The app will load on your device

   - **iOS Simulator (Mac only):**
```bash
     npm run ios
     # or press 'i' in the terminal after starting the dev server
```

   - **Android Emulator:**
```bash
     npm run android
     # or press 'a' in the terminal after starting the dev server
```

   - **Development Build:**
     - Follow the [Expo Development Build guide](https://docs.expo.dev/develop/development-builds/introduction/)
     - Build and install the development client on your device
     - Open the app and connect to the Metro bundler

---

## 🔧 Development Tips

- **Hot Reloading:** The app automatically reloads when you save changes to your code
- **Debugging:** Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) to open the developer menu
- **ngrok URL Updates:** If you restart ngrok, don't forget to update the URL in `/config/api.ts`
- **Clear Cache:** If you encounter issues, try clearing the cache with `npx expo start -c`

---

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.