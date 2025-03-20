import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import VcPress from '@/components/vcPress';
import { VcConstant } from '@/utils/constant';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 50 }}>Error!</Text>
      <View style={styles.container}>
        <MaterialIcons name="stop-screen-share" size={200} color={VcConstant.colors.primary} />
        <VcPress onPress={() => router.navigate('/')}>
          <Text style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>Đăng xuất!</Text>
        </VcPress>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20
  }
});
