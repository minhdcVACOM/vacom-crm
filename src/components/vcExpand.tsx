import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import VcPress from './vcPress';
import VcCard from './vcCard';
interface IProps {
    title: string;
    children: React.ReactNode;
    isExpanded?: boolean;
}
const VcExpand = ({ title, children, isExpanded }: IProps) => {
    const [expanded, setExpanded] = useState(false);
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        Animated.timing(rotateAnim, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setExpanded(!expanded);
    };
    useEffect(() => {
        if (isExpanded) toggleExpand();
    }, [isExpanded]);
    const rotate = rotateAnim.interpolate({
        inputRange: isExpanded ? [0, 1] : [1, 0],
        outputRange: ['0deg', '90deg'], // Xoay 90 độ
    });

    return (
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            <VcCard>
                <VcPress onPress={toggleExpand} style={styles.header}>
                    <Animated.View style={{ transform: [{ rotate }] }}>
                        <Entypo name="chevron-right" size={24} color="black" />
                    </Animated.View>
                    <Text style={styles.title}>{title}</Text>
                </VcPress>
                {expanded && (
                    <View style={styles.content}>
                        {children}
                    </View>
                )}
            </VcCard>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 12,
        gap: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    content: {
        backgroundColor: '#f9f9f9',
    },
});

export default VcExpand;
