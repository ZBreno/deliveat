import { View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";

type OrderSummaryProps = {
  total: number;
  totalDelivery: number;
  ticket: number | string;
  totalFinal: number;
  paymentForm?: string;
  textButton: string;
  onPress: () => void;
};

export default function OrderSummary({
  total,
  totalDelivery,
  totalFinal,
  paymentForm,
  ticket,
  onPress,
  textButton,
}: OrderSummaryProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme["color-bg-stroke"],
        borderRadius: 4,
        padding: 12,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Poppins-Medium" }}>Total</Text>
        <Text style={{ fontFamily: "Poppins-Medium" }}>
          R$ {total.toFixed(2)}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Poppins-Medium" }}>Frete</Text>
        <Text style={{ fontFamily: "Poppins-Medium" }}>
          R$ {Number(7).toFixed(2)}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "Poppins-Medium" }}>Total com frete</Text>
        <Text style={{ fontFamily: "Poppins-Medium" }}>
          R$ {totalDelivery.toFixed(2)}
        </Text>
      </View>

      {ticket && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Poppins-Medium" }}>Cupom</Text>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: theme["color-success-900"],
            }}
          >
            - R$ {typeof ticket === "string" ? "0.00" : ticket.toFixed(2)}
          </Text>
        </View>
      )}

      {paymentForm && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Text style={{ fontFamily: "Poppins-Medium" }}>
            Forma de pagamento
          </Text>
          <Text style={{ fontFamily: "Poppins-Medium" }}>{paymentForm}</Text>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Text style={{ fontFamily: "Poppins-Medium" }}>Total Final</Text>
        <Text style={{ fontFamily: "Poppins-Medium" }}>
          R$ {totalFinal.toFixed(2)}
        </Text>
      </View>
      <Button size="small" style={{ marginTop: 12 }} onPress={onPress}>
        {() => (
          <Text
            style={{
              color: theme["white"],
              fontFamily: "Poppins-Bold",
              fontSize: 14,
            }}
          >
            {textButton}
          </Text>
        )}
      </Button>
    </View>
  );
}
