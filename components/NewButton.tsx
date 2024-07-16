import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from "react-native";
import React, { CSSProperties } from "react";
import { ThemedText } from "./ThemedText";
export type Iprops = TouchableHighlightProps & {
  children: React.ReactNode;
  onPress: () => void;
  backgroundColor?: string;
  type?: "default" | "primary";
  style?: CSSProperties | StyleProp<ViewStyle>;
  Color?: string;
  width?: number;
  isImage?: boolean;
};
const NewButton = ({
  children,
  onPress,
  type = "default",
  backgroundColor,
  style,
  Color = "#ffffff",
  width,
  isImage = false,
  ...rest
}: Iprops) => {
  return (
    <TouchableHighlight
      underlayColor={!isImage ? "#4C30FF99" : ""}
      style={[
        { width },
        { backgroundColor },
        type === "primary" ? styles.primary : undefined,
        type === "default" ? styles.default : undefined,
        ,
        style,
      ]}
      activeOpacity={0.5}
      onPress={onPress}
      {...rest}
    >
      <ThemedText type="normal" Color={Color}>
        {children}
      </ThemedText>
    </TouchableHighlight>
  );
};

export default NewButton;

const styles = StyleSheet.create({
  default: {
    // backgroundColor: "#4C30FF",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    borderRadius: 5,
  },
  primary: {
    // backgroundColor: "#4C30FF",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    borderRadius: 100,
    width: "24%",
    // paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
