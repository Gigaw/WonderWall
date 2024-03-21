import React from "react";
import { View } from "react-native";

const Spacer = ({ height, width }) => {
  return <View style={{ height: height || 10, width: width || 10 }} />;
};

export default Spacer;
