import Home from "@app/screens/Home/Home";
import Map from "@app/screens/Map";
import Profile from "@app/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
