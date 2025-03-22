import VcPress from "@/components/vcPress";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ListOrgUnit = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>ListOrgUnit</Text>
            <VcPress title="Go to Home" onPress={() => router.replace("/(drawer)")} />
        </View>
    );
}
export default ListOrgUnit;