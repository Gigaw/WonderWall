import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import InfoRow from "./InfoRow";
import Spacer from "../../components/Spacer";
import { Button } from "react-native-paper";
import { createBooking } from "../../api/booking/create";
import useAuthStore from "../../stores/auth";

const apiURL = process.env.EXPO_PUBLIC_API_URL;

const getBooking = async (tourId, token) => {
  const response = await fetch(apiURL + `/bookings/by-tour-id/${tourId}`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error();
  return await response.json();
};
// const deleteTourAlert = (name, onYesPress) =>
//   Alert.alert("Удаление Тура", "Вы уверены что хотите удалить тур - " + name, [
//     { text: "Нет", onPress: () => console.log("Нет Pressed") },
//     { text: "Да", onPress: onYesPress },
//   ]);
const createBookingSuccessAlert = () =>
  Alert.alert("Успех", "Заявка успешно отправлена", [
    { text: "Ок", onPress: () => console.log("Да Pressed") },
  ]);
const notAuthAlert = () =>
  Alert.alert(
    "Уведомление",
    "Войдите чтобы иметь возможность подать заявку на тур",
    [{ text: "Ок", onPress: () => console.log("Да Pressed") }]
  );

const askRequestBooking = (func) =>
  Alert.alert(
    "Уведомление",
    "Вы точно хотите подать заявку на тур?",
    [{ text: "Нет", onPress: () => console.log("Да Pressed") }][
      { text: "Да", onPress: () => func() }
    ]
  );

const TourDetail = ({ navigation, route }) => {
  const {
    description,
    distance,
    duration,
    img_url,
    location,
    name,
    price,
    id,
  } = route.params.data;
  const token = useAuthStore((state) => state.token);
  const isAuth = useAuthStore((state) => state.isAuth);
  const [booking, setBooking] = useState(null);
  const statusIntoText = (statusId) => {
    switch (statusId) {
      case 1:
        return "Заявка находится в обработке";
      case 2:
        return "Заявка Подтверждена Администратором";
      case 3:
        return "Заявка отклонена Администратором";
    }
  };
  const fetchCreateBooking = async () => {
    try {
      const res = await createBooking({ tour_id: id }, token);
      if (res) {
        createBookingSuccessAlert();
        setBooking(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGetBooking = async () => {
    try {
      const res = await getBooking(id, token);

      if (res.id) {
        console.log("res", res);
        setBooking(res);
      } else {
        setBooking(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetBooking();
  }, []);

  console.log(booking);

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

        <InfoRow name="Цена" value={price + " р"} />
        <InfoRow name="Длительность" value={duration + " Ч."} />
        <InfoRow name="Дистанция" value={distance + " Км."} />
        <InfoRow name="Локация" value={location} />
        <Spacer height={100} />
        <Button
          onPress={() => {
            if (isAuth) {
              askRequestBooking(fetchCreateBooking);
            } else {
              notAuthAlert();
            }
          }}
          disabled={booking !== null}
        >
          {booking === null ? "Заявка" : statusIntoText(booking.status_id)}
        </Button>
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
