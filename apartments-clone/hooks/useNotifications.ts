import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";
import Constants from 'expo-constants';

export const useNotifications = () => {
  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log("TOKEN:", pushTokenString);
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  };

  const handleNotification = (notification: Notifications.Notification) => {

  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data: { url?: string } = response.notification.request.content.data;

    if (data?.url) Linking.openURL(data.url);
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse
  };
};