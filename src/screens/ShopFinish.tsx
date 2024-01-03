import { View, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import { Text, useTheme } from "@ui-kitten/components";
import ArrowBack from "../components/ArrowBack";
import Icon from "../components/Icon";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { InputField, SelectField } from "../components/Form/FormFields";
import { paymentOptions } from "../utils/formOptions";
import OrderSummary from "../components/OrderSummary";
import { useAuth } from "../hooks/useAuth";
import { useCreateOrder } from "../hooks/orders";
import { StackScreenProps } from "@react-navigation/stack";
import { ShopStackParamlist } from "../navigators/ShopStack";
import { useShop } from "../hooks/useShop";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../navigators/AppStack";

export type ShopScreenProps = StackScreenProps<
  ShopStackParamlist,
  "ShopFinish"
>;

export default function ShopFinish({ route }: ShopScreenProps) {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const schema = Yup.object().shape({
    payment_method: Yup.string().oneOf(
      paymentOptions.map((option) => option.value),
      "Este campo é obrigatório"
    ),
    change: Yup.number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .positive("O valor deve ser um número positivo")
      .nullable(),
    observation: Yup.string().nullable(),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      payment_method: "",
      change: null,
      observation: "",
    },
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();
  const { shop } = useShop();
  const createOrderMutation = useCreateOrder();

  const onSubmit = (data) => {

    createOrderMutation.mutate(
      {
        total: route.params.totalFinal,
        address_id: user.addresses[0].id,
        status: "PENDENTE",
        store_id: Object.values(shop)[0].user_id,
        products: Object.values(shop).map((product) => product.id),
        ...data,
      },

      {
        onSuccess: () => {
          ToastAndroid.show("Pedido realizado!", ToastAndroid.SHORT);
          navigation.navigate("Home");
        },
        onError: (err) => {
          // console.log(JSON.stringify(err.config.data, null, 2));
          ToastAndroid.show(
            "Não foi possivel criar o pedido",
            ToastAndroid.SHORT
          );
        },
      }
    );
  };

  const paymentForm = useWatch({ control, name: "payment_method" });

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, flex: 1, backgroundColor: "white" }}
    >
      <HeaderNavigation
        childrenLeft={<ArrowBack />}
        childrenCenter={
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              Minha Sacola
            </Text>
          </View>
        }
        childrenRight={
          <TouchableOpacity style={{ marginTop: 10 }}>
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
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text category="s1">Entrar no endereço</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: theme["color-primary-500"] }}>
              Trocar
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: theme["color-bg-stroke"],
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              borderRadius: 25,
            }}
          >
            <Icon name="pin" size={24} themeFillColor="color-primary-500" />
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 14 }}>
              {user.addresses[0].street}, {user.addresses[0].number}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: -6,
                color: theme["color-sended"],
              }}
            >
              {user.addresses[0].district}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 32,
            marginBottom: 12,
          }}
          category="s1"
        >
          Forma de pagamento
        </Text>
        <View style={{ gap: 16 }}>
          <SelectField
            control={control}
            name="payment_method"
            label="Tipo*"
            placeholder={"Escolha uma das opções"}
            options={paymentOptions}
          />

          {paymentForm == "money" && (
            <InputField
              control={control}
              name="change"
              label="Troco para?"
              placeholder="Digite aqui"
              keyboardType="numeric"
              caption="Caso não precise de troco, pode deixar o campo em branco"
            />
          )}
          <InputField
            control={control}
            name="observation"
            label="Observação"
            placeholder="Digite aqui"
          />
          <View style={{ marginBottom: 32 }}>
            <Text style={{ marginBottom: 16 }} category="s1">
              Resumo do pedido
            </Text>
            <OrderSummary
              total={route.params.total}
              totalDelivery={7}
              ticket={route.params.ticket === 0 ? "0" : route.params.ticket}
              totalFinal={route.params.totalFinal}
              textButton="Finalizar compra"
              paymentForm={
                paymentOptions.find((option) => option.value === paymentForm)
                  ?.label
              }
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
