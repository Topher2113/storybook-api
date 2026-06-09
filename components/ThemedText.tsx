import { Text, type TextProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type Props = TextProps;

export function ThemedText({ style, ...props }: Props) {
  const { theme } = useTheme();
  return (
    <Text
      style={[{ fontFamily: theme.fonts.body, color: theme.colors.text }, style]}
      {...props}
    />
  );
}
