import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { VcStore } from '@/redux/vcStore';
import { PopupProvider } from '@/components/dialog/popupProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
      <RootSiblingParent>
        <PopupProvider>
          <Provider store={VcStore}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen name="forgotPass" options={{ title: "Quên mật khẩu" }} />
              <Stack.Screen name="listOrgUnit" />
              <Stack.Screen name="setting" />
              <Stack.Screen name="pageView" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Provider>
        </PopupProvider>
      </RootSiblingParent>
    </SafeAreaView>
  );
}
