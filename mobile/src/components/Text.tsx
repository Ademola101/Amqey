import React, { FC, JSX } from "react";
import {
  StyleProp,
  Text as RNText,
  TextStyle,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { theme } from "../../config/theme";

const textStyles = {
  h1: { fontSize: 32, fontFamily: "ExtraBold", lineHeight: 40 },
  h2: { fontSize: 28, fontFamily: "Bold", lineHeight: 36 },
  h3: { fontSize: 24, fontFamily: "Bold", lineHeight: 32 },
  h4: { fontSize: 20, fontFamily: "Medium", lineHeight: 28 },
  h4Bold: { fontSize: 20, fontFamily: "Bold", lineHeight: 28 },
  h5Bold: { fontSize: 18, fontFamily: "Bold", lineHeight: 24 },
  h5: { fontSize: 18, fontFamily: "Regular", lineHeight: 24 },
  h6: { fontSize: 16, fontFamily: "Regular", lineHeight: 22 },
  h6Bold: { fontSize: 16, fontFamily: "Bold", lineHeight: 22 },
  body1: { fontSize: 14, fontFamily: "Regular", lineHeight: 20 },
  body1Bold: { fontSize: 14, fontFamily: "Bold", lineHeight: 20 },
  body2: { fontSize: 12, fontFamily: "Regular", lineHeight: 18 },
  body2Bold: { fontSize: 12, fontFamily: "Bold", lineHeight: 18 },
  body3: { fontSize: 10, fontFamily: "Regular", lineHeight: 16 },
  body3Bold: { fontSize: 10, fontFamily: "Bold", lineHeight: 16 },
  body2Italic: { fontSize: 12, fontFamily: "Italic", lineHeight: 18 },
};

interface Props {
  variant?: keyof typeof textStyles;
  text: string | number | JSX.Element;
  style?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  color?: string;
  align?: "center" | "left" | "right" | "justify";
  spacing?: keyof typeof theme.spacing;
  underlined?: boolean;
  lines?: number;
  opacity?: number;
  flex?: number;
  animated?: boolean;
  
}

const Text: FC<Props> = ({
  variant = "body1",
  color = theme.colors.black,
  align = "left",
  spacing,
  text,
  style = {},
  wrapperStyle = {},
  underlined,
  lines,
  opacity,
  flex,
}) => {
  const textStyle = StyleSheet.create({
    base: {
      ...textStyles[variant],
      textAlign: align,
      textDecorationLine: underlined ? "underline" : undefined,
      opacity: opacity,
      color: color || theme.colors.white,
      marginBottom: spacing ? theme.spacing[spacing] : 0,
      
    },
  });

  const textComponent = (
    <RNText style={[textStyle.base, style]} numberOfLines={lines}>
      {text}
    </RNText>
  );

// @ts-expect-error: wrapperStyle is not a valid prop for View
  if (flex || Object.keys(wrapperStyle).length > 0) {
    return <View style={[{ flex }, wrapperStyle]}>{textComponent}</View>;
  }
  return textComponent;
};

export default Text;
