import { useFormik } from "formik";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import Spacer from "../../components/Spacer";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createTour, uploadTourImage } from "../../api/tour/create";
import useAuthStore from "../../stores/auth";
import useToursStore from "../../stores/tours";
const apiURL = process.env.EXPO_PUBLIC_API_URL;

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, "Name must be at least 4").required("Required"),
  description: Yup.string()
    .min(20, "Description must be at least 20")
    .required("Required"),
  price: Yup.number().required().positive().integer(),
  duration: Yup.number().required().positive().integer(),
  distance: Yup.number().required().positive().integer(),
  location: Yup.string()
    .min(4, "location must be at least 4")
    .required("Required"),

  level: Yup.number().required().positive().integer(),
});

const tourCreatedSuccessfullyAlert = () =>
  Alert.alert("Успех", "Создание тура прошло успешно", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const tourNotCreatedAlert = () =>
  Alert.alert("Не вышло", "Тур не создан, попробуйте позже", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const CreateTour = ({}) => {
  // const {}

  const token = useAuthStore((state) => state.token);
  const addTour = useToursStore((state) => state.addTour);
  const [image, setImage] = useState(null);
  const uploadImage = async () => {
    try {
      console.log(image);
      const filename = image.uri.replace(`/^.*[\\/]/`, "");
      const formData = new FormData();
      formData.append("image", image);
      // formData.append(
      //   "image",
      //   {
      //     name: filename,
      //     uri:
      //       Platform.OS === "ios"
      //         ? image.uri.replace("file://", "")
      //         : image.uri,
      //     type: image.mimeType,
      //   },
      //   filename
      // );

      const response = await fetch(apiURL + `/tours/upload-img/${10}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": undefined,
          authorization: "Bearer " + token,
        },
      });

      // const response = await uploadTourImage({
      //   token,
      //   image_url: image,
      //   tourId: 10,
      // });
      if (response.ok) {
        tourCreatedSuccessfullyAlert();
      }
    } catch (error) {
      console.log("upload image error", error.message);
    }
  };
  const { values, errors, handleBlur, handleChange, submitForm, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        price: "",
        duration: "",
        location: "",
        level: "",
        distance: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        createTour(values, token).then((res) => {
          // addTour(res);
          if (image) {
            uploadTourImage({ token, image_url: image, tourId: res.id })
              .then((res) => {
                tourCreatedSuccessfullyAlert();
              })
              .catch((error) =>
                console.log("upload image error", error.message)
              );
          } else {
            tourCreatedSuccessfullyAlert();
          }
          // resetForm();
        });
      },
    });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0]);
      setImage(result.assets[0]);
    }
  };
  // console.log(image);
  return (
    <SafeAreaView>
      <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Spacer height={10} />
        {image?.uri ? (
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={{ uri: image.uri }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              backgroundColor: "lightgrey",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => pickImage()}
          >
            <AntDesign name="pluscircleo" size={32} color="purple" />
          </TouchableOpacity>
        )}

        <Spacer height={10} />
        <TextInput
          label="Название"
          value={values.name}
          error={errors.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Описание"
          multiline
          style={{ height: 100 }}
          value={values.description}
          error={errors.description}
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
        />
        <HelperText type="error" visible={!!errors.description}>
          {errors.description}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Цена в рублях"
          keyboardType="numeric"
          value={values.price}
          error={errors.price}
          onChangeText={handleChange("price")}
          onBlur={handleBlur("price")}
        />
        <HelperText type="error" visible={!!errors.price}>
          {errors.price}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Длительность в часах"
          keyboardType="numeric"
          value={values.duration}
          error={errors.duration}
          onChangeText={handleChange("duration")}
          onBlur={handleBlur("duration")}
        />
        <HelperText type="error" visible={!!errors.duration}>
          {errors.duration}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Локация (название населенного пункта)"
          value={values.location}
          error={errors.location}
          onChangeText={handleChange("location")}
          onBlur={handleBlur("location")}
        />
        <HelperText type="error" visible={!!errors.location}>
          {errors.location}
        </HelperText>
        <Spacer height={10} />
        <TextInput
          label="Дистанция в километрах"
          keyboardType="numeric"
          value={values.distance}
          error={errors.distance}
          onChangeText={handleChange("distance")}
          onBlur={handleBlur("distance")}
        />
        <HelperText type="error" visible={!!errors.distance}>
          {errors.distance}
        </HelperText>
        <Spacer height={10} />
        <View style={{ backgroundColor: "white", padding: 10 }}>
          <RNPickerSelect
            style={{}}
            placeholder={{
              label: "Выберите уровень сложности",
              value: "0",
              key: 0,
            }}
            value={values.level}
            onValueChange={handleChange("level")}
            items={[
              { label: "Легкий", value: "1", key: 1 },
              { label: "Средний", value: "2", key: 2 },
              { label: "Сложный", value: "3", key: 3 },
            ]}
          />
        </View>
        <HelperText type="error" visible={!!errors.level}>
          {errors.level}
        </HelperText>
        <Spacer height={10} />
        <Button mode="contained" onPress={submitForm}>
          Создать тур
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTour;
