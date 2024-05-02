import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/auth";
import Spacer from "../../components/Spacer";
const apiURL = process.env.EXPO_PUBLIC_API_URL;

const approvedBookingAlert = () =>
  Alert.alert("Успех", "Заявка принята", [
    { text: "Ок", onPress: () => console.log("Да Pressed") },
  ]);

const rejectedBookingAlert = () =>
  Alert.alert("Успех", "Заявка отклонена", [
    { text: "Ок", onPress: () => console.log("Да Pressed") },
  ]);

const Bookings = () => {
  const token = useAuthStore((state) => state.token);
  const [bookings, setBookings] = useState([]);
  const getBookings = async (token) => {
    const response = await fetch(apiURL + "/bookings", {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    return response;
  };
  const approveBooking = async (id) => {
    try {
      const res = await fetch(apiURL + "/bookings/approve/" + id, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setBookings((prev) => {
          return prev.filter((el) => el.id !== id);
        });
        approvedBookingAlert();
      } else {
        console.log("first", res.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const rejectBooking = async (id) => {
    try {
      const res = await fetch(apiURL + "/bookings/reject/" + id, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setBookings((prev) => {
          return prev.filter((el) => el.id !== id);
        });
        rejectedBookingAlert();
      } else {
        console.log("first", res.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const statusIntoText = (status) => {
    switch (status) {
      case "Pending":
        return { text: "Заявка В обработке", color: "#8B8000" };
      case "Approved":
        return { text: "Заявка Принята", color: "green" };
      case "Rejected":
        return { text: "Заявка отклонена", color: "red" };
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await getBookings(token);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        setBookings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>{item.tour_name}</Text>
                <Text style={{ color: statusIntoText(item.status_name).color }}>
                  {statusIntoText(item.status_name).text}
                </Text>
                <Text>{item.user_name}</Text>
                <Text>{item.user_phone}</Text>
              </View>
              {item.status_name === "Pending" && (
                <View>
                  <TouchableOpacity onPress={() => approveBooking(item.id)}>
                    <Text style={{ color: "green" }}>Принять</Text>
                  </TouchableOpacity>
                  <Spacer height={10} />
                  <TouchableOpacity onPress={() => rejectBooking(item.id)}>
                    <Text style={{ color: "red" }}>Отклонить</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListHeaderComponent={<Spacer height={20} />}
          ListFooterComponent={<Spacer height={20} />}
          ItemSeparatorComponent={<Spacer height={10} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookings;
