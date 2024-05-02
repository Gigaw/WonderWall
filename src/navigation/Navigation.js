import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import TabNavigation from "./TabNavigation";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import useAuthStore from "../stores/auth";
import CreateTour from "../screens/CreateTour/CreateTour";
import TourDetail from "../screens/TourDetail/TourDetail";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerBackTitle: "Назад", headerTitle: "" }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TourDetail" component={TourDetail} />
        <Stack.Screen name="CreateTour" component={CreateTour} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
