import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";

import Spacer from "../../components/Spacer";

const ListItem = ({ data, onPress, onDelete, onEdit, isEditable }) => {
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
      {!!isEditable && (
        <TouchableOpacity onPress={() => onDelete()} style={styles.crossBtn}>
          <Entypo name="circle-with-cross" size={32} color="purple" />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity onPress={() => onEdit()} style={styles.editBtn}>
        <AntDesign name="edit" size={32} color="purple" />
      </TouchableOpacity> */}
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
  crossBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
  },
  editBtn: {
    position: "absolute",
    top: 30,
    right: -10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 0,
    borderWidth: 2,
    borderColor: "purple",
  },
});

export default ListItem;
