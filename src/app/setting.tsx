import VcExpand from "@/components/vcExpand";
import VcPress from "@/components/vcPress";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

const Setting = () => {
    const router = useRouter();
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <VcExpand title="Setting" isExpanded={true}>
                <VcPress style={{ borderRadius: 12 }} onPress={() => router.navigate("/pageView")}>
                    <Text style={{ padding: 10 }}>Mở nội dung page view...!</Text>
                </VcPress>
            </VcExpand>
        </View>
    )
}
export default Setting;