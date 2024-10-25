import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC82OHwYUuBoQgfLitpXIeQco1NsdR5aSc",
  authDomain: "agefred-2025.firebaseapp.com",
  projectId: "agefred-2025",
  storageBucket: "agefred-2025.appspot.com",
  messagingSenderId: "982567018309",
  appId: "1:982567018309:web:94e82a06b9cd01f8a6e82c",
  measurementId: "G-BTRPBS9GH0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

export const initializeFirebaseMessaging = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY' // Replace with your VAPID key
    });
    return token;
  } catch (error) {
    console.error('Failed to get messaging token:', error);
    return null;
  }
};