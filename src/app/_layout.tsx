import { setDialogRef } from '@/components/dialog/appAlert';
import { AppDialogProvider, useAppDialog } from '@/components/dialog/appDialogContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "react-native"

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
        {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
        {/* <StatusBar hidden={true} /> */}
        <InitDialog />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="forgotPass" options={{ title: "Quên mật khẩu" }} />
          <Stack.Screen name="listOrgUnit" options={{ headerShown: false }} />
          <Stack.Screen name="setting" />
          <Stack.Screen name="pageView" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AppDialogProvider>
    </SafeAreaView>
  );
}
