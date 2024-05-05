import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
import * as Yup from "yup";

import HomeTabs from "./Tabs";
import Spacer from "../../components/Spacer";
import ListItem from "./ListItem";
import { getTours } from "../../api/tour/get";
import useAuthStore from "../../stores/auth";
import useToursStore from "../../stores/tours";
import { useFormik } from "formik";
import { deleteTour } from "../../api/tour/delete";
import AppBg from "../../components/AppBg";
const windowHeight = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;
const validationSchema = Yup.object().shape({
  search: Yup.string(),
});

const deleteTourAlert = (name, onYesPress) =>
  Alert.alert("Удаление Тура", "Вы уверены что хотите удалить тур - " + name, [
    { text: "Нет", onPress: () => console.log("Нет Pressed") },
    { text: "Да", onPress: onYesPress },
  ]);
const deleteTourSuccessAlert = () =>
  Alert.alert("Успех", "Тур успешно удален", [
    { text: "Ок", onPress: () => console.log("Да Pressed") },
  ]);

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAuthStore((state) => state.token);
  const { tours, setTours, setIsLoading, removeTour, isLoading } =
    useToursStore((state) => state);
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const isAdmin = isAuth && user?.role_name === "admin";
  const [activeSection, setActiveSection] = useState(1);

  const fetchDeleteTour = async (id) => {
    try {
      const response = await deleteTour(id, token);

      if (response) {
        removeTour(id);
        deleteTourSuccessAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTours = ({ search, level } = {}) => {
    setIsLoading(true);
    getTours({ token, search, level })
      .then((res) => {
        setTours(res);
        setIsLoading(false);
      })
      .catch((e) => console.log("error", e));
  };

  useEffect(() => {
    fetchTours({ level: activeSection });
  }, [activeSection]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBg />
      {/* <LinearGradient
        colors={[
          "rgba(113,214,218,255)",
          "rgba(84,206,183,255)",
          "rgba(236,163,51,255)",
          "rgba(132,222,248,255)",
        ]}
        locations={[0, 0.2, 0.35, 0.6]}
        style={styles.background}
      /> */}
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <>
              <Spacer height={10} />
              <Searchbar
                right={() => (
                  <TouchableOpacity
                    onPress={() => {
                      if (searchQuery) {
                        fetchTours({
                          search: searchQuery,
                          level: activeSection,
                        });
                      }
                    }}
                  >
                    <Text>Найти</Text>
                  </TouchableOpacity>
                )}
                placeholder="Поиск"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />

              <Spacer height={10} />
              {!searchQuery ? (
                <>
                  <HomeTabs
                    activeTab={activeSection}
                    onTabClick={setActiveSection}
                  />
                  <Spacer height={20} />
                </>
              ) : null}
            </>
          }
          data={tours}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              isEditable={isAdmin}
              onPress={() => navigation.navigate("TourDetail", { data: item })}
              onDelete={() =>
                deleteTourAlert(item.name, () => fetchDeleteTour(item.id))
              }
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          ItemSeparatorComponent={<Spacer height={10} />}
        />
        {isAdmin && (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate("CreateTour")}
          >
            <Text>Добавить маршрут +</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: windowHeight,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  list: {},
  listContainer: {
    paddingHorizontal: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
});
