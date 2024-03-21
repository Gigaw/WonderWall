import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import * as Yup from "yup";

import Spacer from "../components/Spacer.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  name: Yup.string().min(4, "Name must be at least 4").required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

const SignUp = () => {
  const [passwordEyeOpened, setPasswordEyeOpened] = useState(false);
  const [passwordRepeatEyeOpened, setPasswordRepeatEyeOpened] = useState(false);

  const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues: { email: "", password: "", name: "", repeatPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <TextInput
          label="First name"
          value={values.name}
          error={errors.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Email"
          error={errors.email}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          secureTextEntry={!passwordEyeOpened}
          label="Password"
          error={errors.password}
          right={
            <TextInput.Icon
              onPress={() => setPasswordEyeOpened((prev) => !prev)}
              icon="eye"
            />
          }
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          secureTextEntry={!passwordRepeatEyeOpened}
          right={
            <TextInput.Icon
              onPress={() => setPasswordRepeatEyeOpened((prev) => !prev)}
              icon="eye"
            />
          }
          error={errors.repeatPassword}
          label="Repeat password"
          value={values.repeatPassword}
          onChangeText={handleChange("repeatPassword")}
          onBlur={handleBlur("repeatPassword")}
        />
        <HelperText type="error" visible={!!errors.repeatPassword}>
          {errors.repeatPassword}
        </HelperText>
        <Spacer height={10} />
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          log in
        </Button>
        <Spacer height={10} />
        <Button onPress={() => console.log("Pressed")}>registration</Button>
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

export default SignUp;
