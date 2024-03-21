import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import useAuthStore from "../stores/auth";

export default function Profile() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
      <Button title="Sign out" onPress={() => setIsAuth(false)} />
      {/* <Image /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
