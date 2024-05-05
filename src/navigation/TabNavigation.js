import Home from "@app/screens/Home/Home";
import Profile from "@app/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import useAuthStore from "../stores/auth";
import SignIn from "../screens/SignIn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Bookings from "../screens/Bookings/Bookings";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const isAdmin = isAuth && user?.role_name === "admin";

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Главная"
        component={Home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "purple",
          tabBarIcon: () => <AntDesign name="home" size={32} color="purple" />,
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Заявки"
          component={Bookings}
          options={{
            tabBarActiveTintColor: "purple",
            tabBarIcon: () => <Entypo name="ticket" size={32} color="purple" />,
          }}
        />
      )}

      <Tab.Screen
        name="Профиль"
        component={Profile}
        options={{
          tabBarActiveTintColor: "purple",
          headerTitle: '',
          headerShown: false,
          tabBarIcon: () => <Ionicons name="person" size={32} color="purple" />,
        }}
        listeners={({ navigation }) => ({
          tabPress: () => (!isAuth ? navigation.navigate("SignIn") : null),
        })}
      />
    </Tab.Navigator>
  );
}
