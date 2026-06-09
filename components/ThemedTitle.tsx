import { Text, type TextProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type Props = TextProps;

export function ThemedTitle({ style, ...props }: Props) {
  const { theme } = useTheme();
  return (
    <Text
      style={[{ fontFamily: theme.fonts.heading, color: theme.colors.text, fontSize: 28 }, style]}
      {...props}
    />
  );
}
