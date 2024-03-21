import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import TabNavigation from "./TabNavigation";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import useAuthStore from "../stores/auth";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
