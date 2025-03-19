import { VcConstant } from '@/constants/constant';
import { Text, TextStyle, StyleProp } from 'react-native';
interface IProps {
  type?: 'default' | 'headerLarge' | 'header' | 'subHeader' | 'title' | 'subTitle' | 'subText' | 'error'
  style?: StyleProp<TextStyle>,
  children: string
};

export const VcText = ({
  style,
  type,
  children,
}: IProps) => {
  return (
    <Text
      style={[
        VcConstant.stylesText(type),
        style,
      ]}
    >{children}</Text>
  );
}