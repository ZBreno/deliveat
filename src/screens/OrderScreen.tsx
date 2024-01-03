import { ScrollView, View } from "react-native";
import React, { lazy, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
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

export type OrderScreenProps = StackScreenProps<OrderStackParamlist, "Order">;

export default function OrderScreen({ navigation }: OrderScreenProps) {
  const { isPending: isPendingMyOrders, data: orders } = useGetMyOrders();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      period: "",
    },
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
