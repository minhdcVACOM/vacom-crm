import { StyleSheet } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const styles = StyleSheet.create({
  headerLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E53935',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999'
  },
  default: {
    fontSize: 14
  },
  subText: {
    fontSize: 14,
    color: '#999'
  },
  error: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#E53935"
  }
});
export const VcConstant = {
  colors: {
    primary: '#E53935',
    primaryLight: '#fcebeb',
    primaryDark: '#9e1714',
    secondary: '#f5f5f5',
    white: '#fff',
    black: '#000',
    blue: "#3498db",
    green: "#2ecc71",
    yellow: "#f39c12",
    purple: "#967aa1",
    gray: "#a9a9a9",
  },
  layout: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    gap: 10,
    padding: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    opacity: 0.6
  },
  stylesText: (type?: 'default' | 'headerLarge' | 'header' | 'subHeader' | 'title' | 'subTitle' | 'subText' | 'error') => {
    const styleMap: { [key: string]: keyof typeof styles } = {
      default: 'default',
      headerLarge: 'headerLarge',
      header: 'header',
      subHeader: 'subHeader',
      title: 'title',
      subTitle: 'subTitle',
      subText: 'subText',
      error: 'error'
    };
    return styles[styleMap[type || 'default']];
  }
};
