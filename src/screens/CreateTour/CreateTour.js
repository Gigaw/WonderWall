import { useFormik } from "formik";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";
import Spacer from "../../components/Spacer";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createTour } from "../../api/tour/create";
import useAuthStore from "../../stores/auth";

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
const CreateTour = () => {
  const token = useAuthStore((state) => state.token);
  const [image, setImage] = useState(null);
  const { values, errors, handleBlur, handleChange, submitForm } = useFormik({
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
      createTour(values, token).then((res) => console.log("res", res));
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // console.log(image);
  return (
    <SafeAreaView>
      <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Spacer height={10} />
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
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
            placeholder="Выберите уровень сложности"
            value={values.level}
            onValueChange={handleChange("level")}
            items={[
              { label: "Легкий", value: "1" },
              { label: "Средний", value: "2" },
              { label: "Сложный", value: "3" },
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