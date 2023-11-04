import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Button, Divider, Text, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import OrderProduct from "../components/OrderProduct";
import { useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import OrderSummary from "../components/OrderSummary";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopStackParamlist } from "../navigators/ShopStack";

export type ShopScreenProps = StackScreenProps<ShopStackParamlist, 'Shop'>

export default function ShopScreen({navigation}: ShopScreenProps) {
  const theme = useTheme();

  const itens = [
    {
      name: "Hamburguer",
      price: 19.9,
      itens: [
        {
          name: "Queijo",
          quantity: 1,
        },
        {
          name: "Refrigerante",
          quantity: 2,
        },
        {
          name: "Ketchup",
          quantity: 3,
        },
      ],
    },
    {
      name: "Pizza",
      price: 27.9,
      itens: [
        {
          name: "Mussarela",
          quantity: 1,
        },
        {
          name: "Refrigerante 2L",
          quantity: 2,
        },
        {
          name: "Ketchup",
          quantity: 3,
        },
        {
          name: "Maionese",
          quantity: 2,
        },
      ],
    },
  ];

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
          <TouchableOpacity style={{ marginTop: 12 }}>
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
        {itens.map(({ name, price, itens }, index) => (
          <OrderProduct itens={itens} name={name} price={price} key={index} />
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
          totalFinal={125 - 8.90}
          textButton="Continuar"
          onPress={() => navigation.navigate('ShopFinish')}
        />
      </View>
    </ScrollView>
  );
}
