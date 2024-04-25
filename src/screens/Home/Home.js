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
} from "react-native";
import { Searchbar } from "react-native-paper";
import * as Yup from "yup";

import HomeTabs from "./Tabs";
import Spacer from "../../components/Spacer";
import ListItem from "./ListItem";
import { getTours } from "../../api/tour/get";
import useAuthStore from "../../stores/auth";
import useToursStore from "../../stores/tours";
const windowHeight = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;
// const validationSchema = Yup.object().shape({
//   search: Yup.string().email("Invalid email").required("Required"),
// });

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const token = useAuthStore((state) => state.token);
  // const setIsLoading = useToursStore(state => state.setIsLoading)
  // const setTours = useToursStore(state => state.setTours)
  // const tours = useToursStore(state )
  const { tours, setTours, setIsLoading, isLoading } = useToursStore(
    (state) => state
  );
  const [activeSection, setActiveSection] = useState("activity");
  // const { values, errors, handleBlur, handleChange } = useFormik({
  //   initialValues: {  },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  useEffect(() => {
    setIsLoading(true);
    getTours(token).then((res) => {
      setTours(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "rgba(113,214,218,255)",
          "rgba(84,206,183,255)",
          "rgba(236,163,51,255)",
          "rgba(132,222,248,255)",
        ]}
        locations={[0, 0.2, 0.35, 0.6]}
        style={styles.background}
      />
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <>
              <Spacer height={10} />
              <Searchbar
                placeholder="Поиск"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
              <Spacer height={10} />
              {/* <HomeTabs
                activeTab={activeSection}
                onTabClick={setActiveSection}
              /> */}
              <Spacer height={20} />
            </>
          }
          data={tours}
          renderItem={({ item }) => (
            <ListItem
              data={item}
              onPress={() => navigation.navigate("TourDetail", { data: item })}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          ItemSeparatorComponent={<Spacer height={10} />}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("CreateTour")}
        >
          <Text>Добавить маршрут +</Text>
        </TouchableOpacity>
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
