import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/components/useColorScheme';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { theme } from '../theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import * as SecureStore from "expo-secure-store";
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, LoadingContext } from '@/context';
import { User } from '@/types/user';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      resetPasswordScreen: { path: "resetpassword/:token" },
    },
  },
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user))
    }
    getUser();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
    <AuthContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={theme}>
          <NavigationContainer linking={linking} independent={true}>
            <RootLayoutNav />
          </NavigationContainer>
        </ApplicationProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer linking={linking} independent={true}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="findLocationScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="forgotPasswordScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="resetPasswordScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="signInScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="signUpScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="propertyDeitalsScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="messageScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="addPropertyScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="myPropertiesScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="editPropertyScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="manageUnitsScreen" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="reviewScreen" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </NavigationContainer>
  );
}
