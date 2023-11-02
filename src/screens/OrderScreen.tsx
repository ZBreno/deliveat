import { ScrollView, View } from "react-native";
import React from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import LocationUser from "../components/LocationUser";
import NotificationTicket from "../components/NotificationIcon";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { SelectField } from "../components/Form/FormFields";
import { periodOptions } from "../utils/formOptions";
import { Text } from "@ui-kitten/components";
import Order from "../components/Order";
export default function OrderScreen() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      period: "",
    },
  });
  const orders = [
    {
      name: "McDonalds",
      itens:
        "2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média",
      image: require("../assets/snackbar-category.png"),
    },
    {
      name: "Subway",
      itens:
        "2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média",
      image: require("../assets/drinks-category.png"),
    },
    {
      name: "Burguer King",
      itens:
        "2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média",
      image: require("../assets/restaurant-category.png"),
    },
    {
      name: "McDonalds",
      itens:
        "2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média 2x Hamburger (bigmac e mc-chicken) 1x Coca-cola 2L e 1x Batata média",
      image: require("../assets/snackbar-category.png"),
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 16 }}
    >
      <HeaderNavigation
        childrenLeft={<LocationUser />}
        childrenRight={<NotificationTicket />}
      />
      <SelectField name="period" control={control} options={periodOptions} />

      <Text style={{ marginBottom: 12, marginTop: 24 }} category="s1">
        Meus pedidos
      </Text>
      <View style={{ gap: 24, marginBottom: 32 }}>
        {orders.map(({ image, itens, name }, index) => (
          <Order key={index} image={image} itens={itens} name={name} />
        ))}
      </View>
    </ScrollView>
  );
}
