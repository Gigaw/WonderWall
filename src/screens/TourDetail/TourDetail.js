import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import InfoRow from "./InfoRow";
import Spacer from "../../components/Spacer";
import { Button } from "react-native-paper";

// {"description": "test description", "distance": 20, "duration": 5, "id": 2, "img_url": "test_img", "level_id": 1, "location": "test location", "map_data": {}, "name": "test", "price": "500.00"},
const TourDetail = ({ navigation, route }) => {
  const { description, distance, duration, img_url, location, name, price } =
    route.params.data;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Spacer height={10} />
        <Image
          source={{ uri: img_url }}
          defaultSource={require("/assets/default_img.jpg")}
          style={{ width: "100%", height: 200 }}
        />
        <Spacer height={10} />
        <Text style={styles.title}>{name}</Text>
        <Spacer height={5} />
        <Text style={styles.description}>{description}</Text>
        <Spacer height={10} />

        {/* <InfoRow name="name" value={name} /> */}
        {/* <InfoRow name="description" value={description} /> */}
        <InfoRow name="price" value={price} />
        <InfoRow name="duration" value={duration} />
        <InfoRow name="distance" value={distance} />
        <InfoRow name="location" value={location} />
        <Spacer height={10} />
        <Button>Забронировать</Button>
        <Spacer height={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
  },
});

export default TourDetail;
