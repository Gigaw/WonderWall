import { LinearGradient } from "expo-linear-gradient";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { TextInput, Searchbar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import * as Yup from "yup";

import HomeTabs from "./Tabs";
import Spacer from "../../components/Spacer";
const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const validationSchema = Yup.object().shape({
  search: Yup.string().email("Invalid email").required("Required"),
});

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("activity");
  const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues: { email: "", password: "", name: "", repeatPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [mode, setMode] = React.useState("horizontal-stack");
  const [snapDirection, setSnapDirection] = React.useState("left");
  const [pagingEnabled, setPagingEnabled] = React.useState(true);
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const [loop, setLoop] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [autoPlayReverse, setAutoPlayReverse] = React.useState(false);

  const data = React.useRef([...new Array(4).keys()]).current;
  const viewCount = 5;
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
        <Text style={styles.title}>Hello, Steran</Text>
        <Spacer height={10} />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Spacer height={10} />
        <HomeTabs activeTab={activeSection} onTabClick={setActiveSection} />
        <Carousel
          style={{
            width: "100%",
            height: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
          width={240}
          height={300}
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          mode={mode}
          loop={loop}
          autoPlay={autoPlay}
          autoPlayReverse={autoPlayReverse}
          data={data}
          modeConfig={{
            snapDirection,
            stackInterval: mode === "vertical-stack" ? 8 : 18,
          }}
          customConfig={() => ({ type: "positive", viewCount })}
          renderItem={({ index }) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "orange",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("/assets/tourists.jpg")}
                style={{ width: "100%", height: "100%" }}
              />
              <View
                style={{
                  width: "100%",
                  padding: 15,
                  position: "absolute",
                  top: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <Text style={{ fontSize: 20 }}>Tours from avid travelers</Text>
                <Text>Don't travel alon!</Text>
              </View>

              <View
                style={{
                  width: "100%",
                  padding: 15,
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  Tours from avid travelers
                </Text>
                <Text style={{ color: "white" }}>Don't travel alon!</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "orange",
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
});
