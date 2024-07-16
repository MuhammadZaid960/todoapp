import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { LinearGradient } from "expo-linear-gradient";

const Header = () => {
  const logo = require("@/assets/images/logo1.png");
  return (
    <ThemedView style={[styles.newHeader]}>
      <Image source={logo} style={styles.logo} />
      <ThemedText type="mainHeading">Tensai Todo App</ThemedText>
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  newHeader: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    borderBottomWidth: 1,
    borderColor:"#D9D9D9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});
