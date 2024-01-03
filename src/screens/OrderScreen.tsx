import { ScrollView, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import LocationUser from "../components/LocationUser";
import NotificationTicket from "../components/NotificationIcon";
import { useForm } from "react-hook-form";
import { SelectField } from "../components/Form/FormFields";
import { periodOptions } from "../utils/formOptions";
import { Text } from "@ui-kitten/components";
import Order from "../components/Order";
import { useGetMyOrders } from "../hooks/orders";
import LoadingContainer from "../components/LoadingContainer";
import { StackScreenProps } from "@react-navigation/stack";
import { OrderStackParamlist } from "../navigators/OrderStack";
import { useFocusEffect } from "@react-navigation/native";
import request from "../utils/request";

export type OrderScreenProps = StackScreenProps<OrderStackParamlist, "Order">;

export default function OrderScreen({ navigation }: OrderScreenProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      period: "",
    },
  });
  const [orders, setOrders] = useState([]);
  const [isPendingMyOrders, setIsPendingMyOrders] = useState<boolean>(true);

  useFocusEffect(() => {
    const fetchData = async () => {
      const response = await request.get("order/list/my_orders");
      if (response.data) {
        setOrders(response.data);
      }
      setIsPendingMyOrders(false);
    };
    fetchData();
  });

  if (isPendingMyOrders) {
    return <LoadingContainer />;
  }

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
        {orders.map(({ store_id, code, status, id }, index) => (
          <Order
            key={index}
            status={status}
            code={code}
            store_id={store_id}
            id={id}
          />
        ))}
      </View>
    </ScrollView>
  );
}
