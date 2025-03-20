import { setDialogRef } from '@/components/dialog/appAlert';
import { AppDialogProvider, useAppDialog } from '@/components/dialog/appDialogContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitDialog = () => {
  const dialog = useAppDialog();

  useEffect(() => {
    setDialogRef(dialog);
  }, [dialog]);

  return null;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppDialogProvider>
        <InitDialog />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="setting" />
          <Stack.Screen name="pageView" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AppDialogProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
