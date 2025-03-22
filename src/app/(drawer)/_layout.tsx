import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

const LayoutDrawer = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                    }}
                />
                <Drawer.Screen
                    name="public" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Public',
                        title: 'Public',
                    }}
                />
                <Drawer.Screen
                    name="maintain" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Maintain',
                        title: 'Maintain',
                    }}
                />
                <Drawer.Screen
                    name="business" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Business',
                        title: 'Business',
                    }}
                />
                <Drawer.Screen
                    name="infoTech" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'InfoTech',
                        title: 'InfoTech',
                    }}
                />
                <Drawer.Screen
                    name="report" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Report',
                        title: 'Report',
                    }}
                />
                <Drawer.Screen
                    name="system" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'System',
                        title: 'System',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
export default LayoutDrawer;
