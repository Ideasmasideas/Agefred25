import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class NotificationService {
  static async requestPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', token);
        return token;
      }
    } catch (error) {
      console.error('Failed to get notification permission:', error);
    }
  }

  static async setupMessageHandlers() {
    messaging().onMessage(async remoteMessage => {
      // Handle foreground messages
      console.log('Received foreground message:', remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Handle background messages
      console.log('Received background message:', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      // Handle notification open when app is in background
      console.log('Notification opened app:', remoteMessage);
    });
  }
}