import { View, Text } from "react-native";
import React from "react";

const InfoRow = ({ name, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        // borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        marginBottom: 10
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{name} :</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default InfoRow;
