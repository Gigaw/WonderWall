import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import * as Yup from "yup";

import Spacer from "../components/Spacer.js";
import useAuthStore from "../stores/auth.js";
// import useSignIn from "../hooks/useSignIn.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const SignIn = ({ navigation }) => {
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  // const signIn = useSignIn();
  const [passwordEyeOpened, setPasswordEyeOpened] = useState(false);

  const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      // signIn(values.email, values.password);
      console.log(values);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <TextInput
          autoCapitalize={false}
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
          autoCapitalize={false}
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
        <Button mode="contained" onPress={() => setIsAuth(true)}>
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
