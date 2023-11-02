import { View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import LocationUser from "../components/LocationUser";
import NotificationTicket from "../components/NotificationIcon";
import { InputField } from "../components/Form/FormFields";
import { useForm } from "react-hook-form";
import Icon from "../components/Icon";
import { Text } from "@ui-kitten/components";
import Category from "../components/Category";
export default function SearchScreen() {
  const categories = [
    {
      title: "Restaurantes",
      width: 170,
      height: 90,
      source: require("../assets/restaurant-category.png"),
    },
    {
      title: "Bebidas",
      width: 170,
      height: 90,
      source: require("../assets/drinks-category.png"),
    },
    {
      title: "Padarias",
      width: 170,
      height: 90,
      source: require("../assets/bakery-category.png"),
    },
    {
      title: "Lanchonetes",
      width: 170,
      height: 90,
      source: require("../assets/snackbar-category.png"),
    },
    {
      title: "Lanchonetes1",
      width: 170,
      height: 90,
      source: require("../assets/snackbar-category.png"),
    },
  ];

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { width } = Dimensions.get('window');


  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 16 }}>
      <HeaderNavigation
        childrenLeft={<LocationUser />}
        childrenRight={<NotificationTicket />}
      />

      <InputField
        name="search"
        control={control}
        placeholder="Procure produtos e estabelecimentos"
        size="large"
        accessoryLeft={() => (
          <Icon name="search" themeFillColor="color-primary-500" size={24} />
        )}
      />

      <Text style={{ marginBottom: 12, marginTop: 24 }} category="s1">
        Categorias
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        {categories.map(({ height, source, title, }, index) => (
          <TouchableOpacity key={index}>
            <Category
              height={height}
              width={(width/2)-24}
              title={title}
              borderRadius={4}
              source={source}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
