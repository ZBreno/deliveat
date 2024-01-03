import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Text, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import OrderProduct from "../components/OrderProduct";
import { useForm, useWatch } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import OrderSummary from "../components/OrderSummary";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopStackParamlist } from "../navigators/ShopStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useShop } from "../hooks/useShop";
import { useGetTicket } from "../hooks/ticket";
export type ShopScreenProps = StackScreenProps<ShopStackParamlist, "Shop">;

export default function ShopScreen({ navigation }: ShopScreenProps) {
  const theme = useTheme();
  const [total, setTotal] = useState(0);
  const [ticketDiscount, setTicketDiscount] = useState(0);

  const { control, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
    defaultValues: {
      ticket: "",
    },
  });

  const { shop } = useShop();
  const code = useWatch({ control, name: "ticket" });

  const handleSumShop = () => {
    let sum = 0;
    Object.values(shop).forEach((product) => {
      sum = sum + product.quantity * product.cost;
    });

    setTotal(sum);
  };
  const { data, refetch } = useGetTicket(code ? code : "default-code");

  const handleTicket = async (code) => {
    if (Object.values(shop).length === 0) {
      setTicketDiscount(0);

      return;
    }
    refetch();
    if (data) {
      setTicketDiscount(data.discount);
      return;
    }
    setTicketDiscount(0);
    setError("ticket", { message: "cupom inválido" });
  };

  useEffect(() => {
    handleSumShop();
  }, [shop]);

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
        {shop &&
          Object.values(shop).map((product) => (
            <OrderProduct key={product.id} product={product} />
          ))}
      </View>
      <Divider />

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <View style={{ flex: 1 }}>
          <InputField
            name="ticket"
            control={control}
            label="Cupom"
            placeholder="Digite seu cupom de desconto"
          />
        </View>

        <Button
          onPress={handleSubmit(handleTicket)}
          size="small"
          style={{
            alignSelf: !formState.isValid ? "center" : "flex-end",
            marginLeft: 8,
            marginTop: !formState.isValid && 6,
          }}
        >
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
      <View style={{ marginBottom: 32 }}>
        <Text style={{ marginTop: 24, marginBottom: 16 }} category="s1">
          Resumo do pedido
        </Text>

        <OrderSummary
          total={total}
          totalDelivery={total + 7}
          ticket={ticketDiscount === 0 ? "0" : ticketDiscount}
          totalFinal={total - ticketDiscount + 7}
          textButton="Continuar"
          onPress={() =>
            navigation.navigate("ShopFinish", {
              total: total,
              totalFinal: total - ticketDiscount + 7,
              ticket: ticketDiscount,
              delivery_cost: 7,
            })
          }
        />
      </View>
    </ScrollView>
  );
}
