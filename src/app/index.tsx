import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import VcPress from '@/components/vcPress';
import { VcText } from '@/components/vcText';
import VcCard from '@/components/vcCard';
import VcLink from '@/components/vcLink';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import VcTextInput from '@/components/vcTextInput';
import { VcConstant } from '@/constants/constant';

export default function LoginScreen() {
    const router = useRouter();
    const [accessCode, setAccessCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', gap: 10, flex: 1 }}>
                <VcText type='headerLarge'>Welcome!</VcText>
                <View style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                    <VcText type='headerLarge' style={{ color: "black" }}>VACOM</VcText>
                    <VcText type='subHeader' style={[{ color: VcConstant.colors.primary }]}>crm</VcText>
                </View>
                <VcText type='subText'>Gìn giữ sự hài lòng</VcText>
            </View>
            <VcCard style={{ borderRadius: 20 }}>
                <VcLink title='http://crm.vacom.vn' textStyle={{ color: VcConstant.colors.purple }} />
                <VcTextInput
                    placeholder="Mã truy cập"
                    value={accessCode}
                    onChangeText={setAccessCode}
                    icon={(color) => <FontAwesome5 name="qrcode" size={20} color={color} />}
                />
                <VcTextInput
                    placeholder="Tên truy cập"
                    value={username}
                    onChangeText={setUsername}
                    icon={(color) => <FontAwesome5 name="user-tie" size={20} color={color} />}
                />
                <VcTextInput
                    placeholder="Mật khẩu"
                    isPassWord={true}
                    value={password}
                    onChangeText={setPassword}
                    icon={(color) => <FontAwesome5 name="lock" size={20} color={color} />}
                />
            </VcCard>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 8 }}>Nhớ mật khẩu</Text>
                </View>
                <VcLink title='Quên mật khẩu ?' textStyle={{ color: VcConstant.colors.primary }} />
            </View>
            <VcPress title='Đăng nhập' skin='primary' onPress={() => router.navigate("/setting")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    txtNameApp: {
        color: '#E53935',
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    }
});
