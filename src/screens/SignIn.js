import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, HelperText, Text } from "react-native-paper";
import * as Yup from "yup";

import Spacer from "../components/Spacer.js";
import useAuthStore from "../stores/auth.js";
import useSignIn from "../hooks/useSignIn.js";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "../api/auth/sign-in.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const SignIn = ({ navigation }) => {
  const queryClient = useQueryClient();
  const logIn = useAuthStore((state) => state.logIn);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  // const signIn = useSignIn();
  const [passwordEyeOpened, setPasswordEyeOpened] = useState(false);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    submitForm,
    handleSubmit,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      signIn({ email: values.email, password: values.password })
        .then((res) => {
          logIn(res.user, res.token);
          // navigation.navigate('TabNavigator')
        })
        .catch((e) => console.log(e));
    },
  });

  const emailError = Boolean(!!errors.email && touched.email);
  const passwordError = Boolean(!!errors.password && touched.password);
  // console.log("password", !!errors.password && touched.password);
  // console.log("email", !!errors.email && touched.email);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          Авторизация
        </Text>
        <Spacer height={30} />
        <TextInput
          autoCapitalize="none"
          label="Электронная почта"
          error={emailError}
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
        />
        <HelperText type="error" visible={emailError}>
          {errors.email}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          autoCapitalize="none"
          secureTextEntry={!passwordEyeOpened}
          label="Пароль"
          error={passwordError}
          right={
            <TextInput.Icon
              onPress={() => setPasswordEyeOpened((prev) => !prev)}
              icon="eye"
            />
          }
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
        <HelperText type="error" visible={passwordError}>
          {errors.password}
        </HelperText>
        <Spacer height={10} />
        <Button mode="contained" onPress={() => handleSubmit()}>
          Войти
        </Button>
        <Spacer height={10} />
        <Button onPress={() => navigation.navigate("SignUp")}>
          Зарегистрироваться
        </Button>
        <Button onPress={() => navigation.navigate("TabNavigation")}>
          Войти без регистрации
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
