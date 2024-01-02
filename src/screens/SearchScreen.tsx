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
import { useGetCategories } from "../hooks/categories";
export default function SearchScreen() {
  const { isPending: isPendingCategory, data: categories } = useGetCategories();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { width } = Dimensions.get("window");

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
        {categories.map(({ name, image }, index) => (
          <TouchableOpacity key={index}>
            <Category
              height={170}
              width={width / 2 - 24}
              title={name}
              borderRadius={4}
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${image}`,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
