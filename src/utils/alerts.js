import { Alert } from "react-native";

export const successAlert = (title) =>
  Alert.alert("Успех", title, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

export const failAlert = (title = "что то пошло не так, попробуйте позже") =>
  Alert.alert("Неудача", title, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
