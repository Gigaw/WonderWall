import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Spacer from "../../components/Spacer";

const Tabs = [
  { id: 1, name: "Activities", type: "activity" },
  { id: 2, name: "Tours", type: "tour" },
  { id: 3, name: "Places", type: "place" },
];

export default function HomeTabs({ activeTab = "activity", onTabClick }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Tabs.map((tab, index) => (
        <>
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, tab.type === activeTab && styles.activeTab]}
            onPress={() => onTabClick(tab.type)}
          >
            <Text>{tab.name}</Text>
          </TouchableOpacity>
          <Spacer width={5} />
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
