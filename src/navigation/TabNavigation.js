import Home from "@app/screens/Home/Home";
import Profile from "@app/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Главная"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Профиль" component={Profile} />
    </Tab.Navigator>
  );
}
