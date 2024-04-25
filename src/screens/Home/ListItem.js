import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import Spacer from "../../components/Spacer";

const ListItem = ({ data, onPress }) => {
  const { description, img_url, name, price } = data;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: img_url }}
        style={styles.img}
        defaultSource={require("/assets/default_img.jpg")}
      />
      {/* <Image source={require("/assets/tourists.jpg")} style={styles.img} /> */}
      <Spacer height={10} />
      <View>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <Spacer height={5} />
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
      <Spacer height={10} />
      <View style={styles.footerContainer}>
        <Text>Цена</Text>
        <Text>{price}р</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {},
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ListItem;
