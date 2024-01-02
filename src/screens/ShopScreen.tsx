import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Text, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import OrderProduct from "../components/OrderProduct";
import { useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import OrderSummary from "../components/OrderSummary";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopStackParamlist } from "../navigators/ShopStack";
import useAsyncStorage from "../hooks/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
export type ShopScreenProps = StackScreenProps<ShopStackParamlist, "Shop">;

export default function ShopScreen({ navigation }: ShopScreenProps) {
  const theme = useTheme();
  const [shoppingCart] = useAsyncStorage("@ue:shopping-cart");

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      ticket: "",
    },
  });

  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 16 }}
    >
      <HeaderNavigation
        childrenLeft={<View />}
        childrenCenter={
          <View style={{ marginTop: 6 }}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Minha Sacola
            </Text>
          </View>
        }
        childrenRight={
          <TouchableOpacity
            onPress={() => AsyncStorage.removeItem("@ue:shopping-cart")}
            style={{ marginTop: 12 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: theme["color-primary-500"],
              }}
            >
              Limpar
            </Text>
          </TouchableOpacity>
        }
      />
      <Text style={{ marginBottom: 16 }} category="s1">
        Meus itens
      </Text>
      <Divider />
      <View style={{ marginTop: 24, gap: 24, marginBottom: 24 }}>
        {shoppingCart &&
          Object.values(shoppingCart).map((product) => (
            <OrderProduct
              key={product.id}
              itens={product.products_bonus}
              name={product.name}
              price={product.cost}
              id={product.id}
              quantity={product.quantity}
            />
          ))}
      </View>
      <Divider />

      <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <InputField
            name="ticket"
            control={control}
            label="Cupom"
            placeholder="Digite seu cupom de desconto"
          />
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <Button size="small">
            {() => (
              <Text
                style={{
                  color: theme["white"],
                  fontSize: 13,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Aplicar
              </Text>
            )}
          </Button>
        </View>
      </View>
      <View style={{ marginBottom: 32 }}>
        <Text style={{ marginTop: 24, marginBottom: 16 }} category="s1">
          Resumo do pedido
        </Text>

        <OrderSummary
          total={120}
          totalDelivery={125}
          ticket={8.9}
          totalFinal={125 - 8.9}
          textButton="Continuar"
          onPress={() => navigation.navigate("ShopFinish")}
        />
      </View>
    </ScrollView>
  );
}
