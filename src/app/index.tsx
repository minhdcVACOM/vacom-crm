import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import VcPress from '@/components/vcPress';
import { VcText } from '@/components/vcText';
import VcCard from '@/components/vcCard';
import VcLink from '@/components/vcLink';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import VcTextInput from '@/components/vcTextInput';
import { VcConstant } from '@/utils/constant';
import { AppAlert } from '@/components/dialog/appAlert';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import VcCheckBox from '@/components/vcCheckBox';

export default function LoginScreen() {
    const router = useRouter();
    const [accessCode, setAccessCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    return (
        <>
            <View style={styles.bgStyle} />
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <VcText type='headerLarge' style={{ color: "#fff", fontSize: 50 }}>VACOM</VcText>
                        <VcText type='subHeader' style={[{ color: "#fff" }]}>crm</VcText>
                    </View>
                </View>
                <VcCard style={{ borderRadius: 20, borderColor: VcConstant.colors.primary, borderWidth: 5, gap: 10 }} >
                    <VcText type='header' style={{ color: VcConstant.colors.primary }}>Đăng nhập</VcText>
                    <VcLink title='http://crm.vacom.vn' textStyle={{ color: VcConstant.colors.purple }}
                        onPress={() =>
                            AppAlert.alert('Thông báo', 'Nội dung thông báo...', ["Xác nhận"],
                                {
                                    icon: color => <MaterialCommunityIcons name="web" size={20} color={color} />,
                                    callBack: (v) => console.log("input value>>", v),
                                    value: "http://crm.vacom.vn",
                                    label: "Đường link"
                                }
                            )
                        }
                    />
                    <VcTextInput
                        label='Mã truy cập'
                        placeholder="Mã truy cập"
                        value={accessCode}
                        onChangeText={setAccessCode}
                        icon={(color) => <FontAwesome5 name="qrcode" size={20} color={color} />}
                    />
                    <VcTextInput
                        label='Tên truy cập'
                        placeholder="Tên truy cập"
                        value={username}
                        onChangeText={setUsername}
                        icon={(color) => <FontAwesome5 name="user-tie" size={20} color={color} />}
                    />
                    <VcTextInput
                        label="Mật khẩu"
                        placeholder="Mật khẩu"
                        isPassWord={true}
                        value={password}
                        onChangeText={setPassword}
                        icon={(color) => <FontAwesome5 name="lock" size={20} color={color} />}
                    />
                </VcCard>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <VcCheckBox label='Nhớ mật khẩu' checked={checked} onChange={setChecked} />
                    <VcLink title='Quên mật khẩu ?' textStyle={{ color: VcConstant.colors.primary }}
                        onPress={() => router.navigate("/forgotPass")}
                    />
                </View>
                <VcPress title='Đăng nhập' skin='primary' onPress={() => router.navigate("/setting")} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bgStyle: {
        position: 'absolute',
        height: "75%",
        width: "100%",
        backgroundColor: VcConstant.colors.primary,
        top: 0,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    txtNameApp: {
        color: '#E53935',
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
    }
});
