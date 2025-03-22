import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

interface PopupContentProps {
    title?: string;
    message: string;
    backgroundColor?: string;
    textColor?: string;
    iconType?: 'success' | 'warning' | 'none';
    confirmText?: string;
    inputLabel?: string;
    inputPlaceholder?: string;
    inputDefaultValue?: string;
    showInput?: boolean;
    onConfirm?: (inputText: string) => void;
    onClose?: () => void;
}

export const PopupContent = ({
    title,
    message,
    backgroundColor = '#fff',
    textColor = '#000',
    iconType = 'none',
    confirmText = 'Xác nhận',
    inputLabel = '',
    inputPlaceholder = '',
    inputDefaultValue = '',
    showInput = false,
    onConfirm,
    onClose,
}: PopupContentProps) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const iconAnim = useRef(new Animated.Value(0)).current;
    const [inputText, setInputText] = useState(inputDefaultValue); // <-- sử dụng giá trị mặc định

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const getIcon = () => {
        let icon;
        switch (iconType) {
            case 'success':
                icon = <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />;
                break;
            case 'warning':
                icon = <Ionicons name="warning" size={50} color="#FFC107" />;
                break;
            default:
                return null;
        }
        return (
            <Animated.View
                style={{
                    transform: [
                        {
                            rotate: iconAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                            }),
                        },
                    ],
                    marginBottom: 10,
                }}
            >
                {icon}
            </Animated.View>
        );
    };

    return (
        <View style={styles.overlay}>
            <Animated.View
                style={[
                    styles.popupContainer,
                    {
                        backgroundColor,
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <View style={styles.titleRow}>
                    {getIcon()}
                    {title && <Text style={[styles.title, { color: textColor }]}>{title}</Text>}
                    <TouchableWithoutFeedback onPress={onClose}>
                        <Ionicons name="close" size={24} color={textColor} />
                    </TouchableWithoutFeedback>
                </View>

                <Text style={[styles.message, { color: textColor }]}>{message}</Text>

                {showInput && (
                    <View style={{ width: '100%', marginTop: 10 }}>
                        {inputLabel ? <Text style={{ color: textColor, marginBottom: 5 }}>{inputLabel}</Text> : null}
                        <TextInput
                            placeholder={inputPlaceholder}
                            placeholderTextColor="#aaa"
                            value={inputText}
                            onChangeText={setInputText}
                            style={[styles.input, { color: textColor, borderColor: '#ccc' }]}
                        />
                    </View>
                )}

                <TouchableWithoutFeedback
                    onPress={() => {
                        onConfirm?.(inputText);
                        onClose?.();
                    }}
                >
                    <View style={styles.button}>
                        <Text style={{ color: '#fff' }}>{confirmText}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: width * 0.8,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
});
