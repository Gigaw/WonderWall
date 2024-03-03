import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Spacer from "../components/Spacer.js";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Spacer height={10} />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Spacer height={10} />
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          log in
        </Button>
        <Spacer height={10} />
        <Button onPress={() => navigation.navigate("SignUp")}>
          registration
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default SignIn;
