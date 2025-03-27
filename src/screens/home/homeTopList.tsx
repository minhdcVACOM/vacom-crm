
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeSticky from "./homeSticky";
import HomeBirthday from "./homeBirthday";
import HomeOvertime from "./homeOvertime";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { useRef } from "react";
const width = Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
    titleFlatList: {
        // color: "#fff",
        fontWeight: "bold",
        margin: 10,
        fontSize: 18,
        paddingLeft: 20
    },
    container: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        gap: 10,
        margin: 10,
        borderRadius: 20
    }
})
interface IData {
    id: string,
    userId: string,
    name: string,
    imgSrc: string,
    birthDay: string,
}
const HomeTopList = () => {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };
    const data = [1, 2];
    const scrollRef1 = useRef<ScrollView>(null);
    const scrollRef2 = useRef<ScrollView>(null);
    return (
        <View>
            <HomeSticky />
            {/* <View style={styles.container}>
                <Carousel
                    ref={ref}
                    width={width}
                    height={width / 2}
                    data={data}
                    onProgressChange={progress}
                    renderItem={({ item, index }) => (
                        index == 0 ? <HomeBirthday gestureHandler={scrollRef1} /> : <HomeOvertime gestureHandler={scrollRef2} />
                    )}
                />
                <Pagination.Basic
                    progress={progress}
                    data={data}
                    dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                    containerStyle={{ gap: 5, marginBottom: 5 }}
                    onPress={onPressPagination}
                />
            </View> */}
            {/* <HomeBirthday /> */}
            <HomeOvertime />
            <Text style={styles.titleFlatList}>Hỗ trợ nhiều nhất</Text>
        </View>
    );
}
export default HomeTopList;