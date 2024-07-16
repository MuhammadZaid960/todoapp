import {
  Text,
  type TextProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { CSSProperties } from "react";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  Color?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "mainHeading"
    | "normal";
  style?: CSSProperties | StyleProp<ViewStyle>;
};
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  Color,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: Color ? Color : lightColor, dark: Color ? Color : darkColor },
    "text"
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "mainHeading" ? styles.mainHeading : undefined,
        type === "normal" ? styles.normal : undefined,
        ,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 36,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  normal: {
    fontSize: 16,
    fontWeight: "400",
  },
});
