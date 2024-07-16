import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
export interface Iprops {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
}
const Input = ({ text, setText, placeholder }: Iprops) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={"#8E8E8E"}
      onChangeText={(newText) => setText(newText)}
      value={text}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "#ffffff",
    gap: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingLeft: 10,
  },
});
