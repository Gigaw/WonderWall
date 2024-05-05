import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const windowHeight = Dimensions.get("window").height;

const AppBg = () => {
  return (
    <LinearGradient
      colors={[
        "rgba(113,214,218,255)",
        "rgba(84,206,183,255)",
        "rgba(236,163,51,255)",
        "rgba(132,222,248,255)",
      ]}
      locations={[0, 0.2, 0.35, 0.6]}
      style={styles.background}
    />
  );
};
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
});
export default AppBg;
