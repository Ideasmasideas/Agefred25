import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from '@react-native-biometrics/biometrics';
import { AuthState } from '../types/auth';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { NotificationService } from '../services/NotificationService';

const rnBiometrics = new ReactNativeBiometrics();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // Request notification permission after successful login
      await NotificationService.requestPermission();
      
      const userData = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: userCredential.user.displayName || 'User',
        role: 'employee', // You might want to fetch this from your database
        department: 'General' // You might want to fetch this from your database
      };

      await AsyncStorage.setItem('token', token);
      set({ 
        user: userData, 
        token: token,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Login failed', 
        isLoading: false 
      });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('biometricKey');
      set({ user: null, token: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      await sendPasswordResetEmail(auth, email);
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Password reset failed', 
        isLoading: false 
      });
    }
  },

  enableBiometrics: async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (available) {
        const { publicKey } = await rnBiometrics.createKeys();
        await AsyncStorage.setItem('biometricKey', publicKey);
      }
    } catch (error) {
      set({ error: 'Biometrics setup failed' });
    }
  },

  loginWithBiometrics: async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) throw new Error('Biometrics not available');

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint'
      });

      if (success) {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) throw new Error('No stored credentials');

        // Verify the token with Firebase
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const userData = {
            id: currentUser.uid,
            email: currentUser.email || '',
            name: currentUser.displayName || 'User',
            role: 'employee',
            department: 'General'
          };
          set({ user: userData, token });
        }
      }
    } catch (error) {
      set({ error: 'Biometric authentication failed' });
    }
  },
}));