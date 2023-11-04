import { View, TouchableOpacity, ScrollView } from "react-native";
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

export default function ShopFinish() {
  const theme = useTheme();

  const schema = Yup.object().shape({
    type: Yup.string().oneOf(
      paymentOptions.map((option) => option.value),
      "Este campo é obrigatório"
    ),
    payment: Yup.number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .positive("O valor deve ser um número positivo")
      .nullable(),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      type: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));

  const paymentForm = useWatch({ control, name: "type" });

  return (
    <ScrollView style={{ paddingHorizontal: 16, flex: 1, backgroundColor: "white" }}>
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
            <Text style={{ fontSize: 14 }}>Rua Maria Gomes da Silveira</Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: -6,
                color: theme["color-sended"],
              }}
            >
              Rua Nova
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
            name="type"
            label="Tipo*"
            placeholder={"Escolha uma das opções"}
            options={paymentOptions}
          />

          {paymentForm == "money" && (
            <InputField
              control={control}
              name="payment"
              label="Troco para?"
              placeholder="Digite aqui"
              keyboardType="numeric"
              caption="Caso não precise de troco, pode deixar o campo em branco"
            />
          )}
          <View style={{marginBottom: 32}}>
            <Text style={{ marginBottom: 16 }} category="s1">
              Resumo do pedido
            </Text>
            <OrderSummary
              total={120}
              totalDelivery={125}
              ticket={8.9}
              totalFinal={125 - 8.9}
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
