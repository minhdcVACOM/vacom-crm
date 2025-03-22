import { VcConstant } from '@/utils/constant';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

const { width } = Dimensions.get('window');
const marginSide = 20;

const getTypeConfig = (type: string): { icon: 'check-circle' | 'error' | 'warning' | 'info'; backgroundColor: string } => {
    switch (type) {
        case 'success':
            return { icon: 'check-circle', backgroundColor: VcConstant.colors.success };
        case 'error':
            return { icon: 'error', backgroundColor: VcConstant.colors.error };
        case 'warning':
            return { icon: 'warning', backgroundColor: VcConstant.colors.warning };
        case 'info':
        default:
            return { icon: 'info', backgroundColor: VcConstant.colors.info };
    }
};
interface IOptions {
    duration?: number;
    position?: 'top' | 'bottom' | 'center';
    textColor?: string;
    fontSize?: number;
    borderRadius?: number;
    type?: 'info' | 'success' | 'warning' | 'error';
}
export const useToast = () => {
    const toastRef = useRef<any>(null);

    const showToast = useCallback((message: string, options: IOptions = {}) => {
        const {
            duration = 2000,
            position = 'top',
            textColor = '#fff',
            fontSize = 16,
            borderRadius = 10,
            type = 'info',
        } = options;

        if (toastRef.current) {
            toastRef.current.destroy();
        }

        toastRef.current = new RootSiblings(
            <ToastContent
                message={message}
                duration={duration}
                position={position}
                textColor={textColor}
                fontSize={fontSize}
                borderRadius={borderRadius}
                type={type}
                onClose={() => {
                    toastRef.current?.destroy();
                    toastRef.current = null;
                }}
            />
        );
    }, []);

    return { showToast };
};

const ToastContent = ({
    message,
    duration,
    position,
    textColor,
    fontSize,
    borderRadius,
    type,
    onClose,
}: any) => {
    const slideAnim = useRef(new Animated.Value(position === 'top' ? -marginSide : marginSide)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const { icon, backgroundColor: typeColor } = getTypeConfig(type);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        const timeout = setTimeout(() => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: position === 'top' ? -marginSide : marginSide,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(onClose);
        }, duration);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    backgroundColor: typeColor,
                    borderRadius,
                    bottom: position === 'bottom' ? marginSide : undefined,
                    top: position === 'top' ? marginSide : position === 'center' ? '50%' : undefined,
                    alignSelf: 'center',
                    transform: [{ translateY: slideAnim }],
                    opacity,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name={icon} size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={{ color: textColor, fontSize }}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 20,
        maxWidth: width * 0.8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
});
