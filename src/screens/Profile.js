import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Spacer from "../components/Spacer";
import useAuthStore from "../stores/auth";

export default function Profile({ navigation }) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Spacer height={20} />
      <Text>{user.email}</Text>
      <Text>{user.name}</Text>
      <Text>{user.phone}</Text>
      <Spacer height={20} />
      <Button
        title="Выйти"
        onPress={() => {
          setIsAuth(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
