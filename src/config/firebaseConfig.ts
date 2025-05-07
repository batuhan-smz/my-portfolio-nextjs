// src/config/firebaseConfig.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// .env dosyasından değişkenleri oku
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC__FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC__FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC__FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC__FIREBASE_APP_ID,
};

// Değişkenlerin yüklenip yüklenmediğini kontrol etmek isteyebilirsiniz
if (!firebaseConfig.apiKey) {
    console.error("Firebase API Key missing. Check your .env file and VITE_ prefix.");
}

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export default app;