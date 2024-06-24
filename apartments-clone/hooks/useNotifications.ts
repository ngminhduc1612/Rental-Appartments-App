import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import Constants from 'expo-constants';
import { useUser } from "./useUser";
import { openSettings } from "expo-linking";

export const useNotifications = () => {
  const { addPushToken, setAllowsNotifications, user } = useUser();

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  const registerForPushNotificationsAsync = async (alertUser?: boolean) => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      if (!user) return;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        if (alertUser)
          Alert.alert(
            "Error",
            "To enable Push Notifications please change your settings.",
            [
              {
                text: "OK",
              },
              {
                text: "Open Settings",
                onPress: async () => openSettings(),
              }
            ]
          );
        if (user.allowsNotifications) setAllowsNotifications(false);
        throw new Error("User doesn't allow for notifications");
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

        addPushToken(pushTokenString);
        if (!user.allowsNotifications) setAllowsNotifications(true);
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