import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput, Button, HelperText, Text } from "react-native-paper";

import Spacer from "../components/Spacer";
import useAuthStore from "../stores/auth";
import AppBg from "../components/AppBg";

export default function Profile({ navigation }) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <AppBg /> */}
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Spacer height={20} />
        <View style={styles.row}>
          <Text style={styles.name}>Почта:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <Spacer height={10} />
        <View style={styles.row}>
          <Text style={styles.name}>Имя:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <Spacer height={10} />
        <View style={styles.row}>
          <Text style={styles.name}>Телефон:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <Spacer height={100} />
        {/* <Button
          title="Выйти"
          onPress={() => {
            logOut();
            navigation.navigate("SignIn");
          }}
        /> */}

        <Button
          mode="contained"
          onPress={() => {
            logOut();
            navigation.navigate("SignIn");
          }}
        >
          Выйти
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "purple",
  },
  value: {
    fontSize: 18,
    color: "purple",
  },
});
