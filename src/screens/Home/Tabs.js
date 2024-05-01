import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tabs = [
  { id: 1, name: "Легкий", type: "easy", level: 1 },
  { id: 2, name: "Средний", type: "medium", level: 2 },
  { id: 3, name: "Сложный", type: "hard", level: 3 },
];

export default function HomeTabs({ activeTab = 1, onTabClick }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, tab.level === activeTab && styles.activeTab]}
          onPress={() => onTabClick(tab.level)}
        >
          <Text>{tab.name}</Text>
        </TouchableOpacity>
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
    marginRight: 5,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
