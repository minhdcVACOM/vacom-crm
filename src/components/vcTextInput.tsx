import { VcConstant } from "@/utils/constant";
import { FontAwesome5 } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
interface IProgs {
    label?: string;
    disable?: boolean;
    textError?: string;
    multiline?: boolean;
    value?: string;
    onBlur?: (e: any) => void;
    onChangeText?: (text: string) => void;
    icon?: (color: string) => ReactNode;
    placeholder?: string;
    isPassWord?: boolean;
}
const VcTextInput = ({
    value, onBlur, onChangeText, icon, placeholder,
    isPassWord, label, disable, textError, multiline
}: IProgs) => {
    const [isFocus, setIsFocus] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const heightStyle = multiline ? { height: 80, textAlignVertical: "top" } : null;
    const color = disable ? VcConstant.colors.gray : (isFocus ? VcConstant.colors.primary : VcConstant.colors.gray);
    return (
        <View style={[styles.container, { borderColor: color }]}>
            {icon && icon(color)}
            {label && <Text style={[styles.label, { borderColor: color }]}>{label}</Text>}
            <TextInput
                style={[styles.input, heightStyle] as any}
                placeholder={placeholder}
                secureTextEntry={isPassWord && !showPass}
                editable={!disable}
                onFocus={() => setIsFocus(true)}
                onBlur={(e) => {
                    setIsFocus(false);
                    if (onBlur) onBlur(e);
                }}
                value={value}
                onChangeText={onChangeText}
            />
            {isPassWord &&
                <FontAwesome5
                    name={showPass ? "eye" : "eye-slash"} size={20}
                    color={color}
                    onPress={() => setShowPass(!showPass)}
                />}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: VcConstant.layout.borderRadius,
        borderWidth: VcConstant.layout.borderWidth,
        // borderColor: VcConstant.layout.borderColor,
        marginVertical: VcConstant.layout.marginVertical,
        padding: VcConstant.layout.padding,
        gap: 10,
        backgroundColor: "#fff"
    },
    input: {
        flex: 1
    },
    label: {
        position: "absolute",
        top: -15,
        left: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        fontWeight: "bold",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 20,
        borderWidth: VcConstant.layout.borderWidth,
    }
})

export default VcTextInput;