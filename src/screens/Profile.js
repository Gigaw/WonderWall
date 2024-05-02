import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";

import Spacer from "../components/Spacer";
import useAuthStore from "../stores/auth";

export default function Profile({ navigation }) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: 'center'
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
        <Button
          title="Выйти"
          onPress={() => {
            logOut();
            navigation.navigate("SignIn");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
  },
});
