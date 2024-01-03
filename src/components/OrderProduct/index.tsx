import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { useShop } from "../../hooks/useShop";

type OrderProductProps = {
  product: {
    name: string;
    product_bonus: any;
    cost: number;
    quantity: number;
    id: string;
    image: any;
  };
};

export default function OrderProduct({ product }: OrderProductProps) {
  const { shop, handleProductQuantity } = useShop();
  const theme = useTheme();

  const removeProduct = product.quantity === 1;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${product.image}`,
          }}
          style={{
            width: 120,
            height: 80,
            resizeMode: "cover",
            borderRadius: 8,
          }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text category="s1">{product.name}</Text>
          <View>
            {product.product_bonus &&
              product.product_bonus.map(({ name, quantity }, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 11,
                    fontFamily: "Poppins-Medium",
                    color: theme["color-sended"],
                  }}
                >
                  {quantity}x {name}
                </Text>
              ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <View>
              <Text category="s1">
                R$ {(product.cost * product.quantity).toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={() => handleProductQuantity("remove", product)}
              >
                <Icon
                  name={removeProduct ? "trash-2-outline" : "minus-outline"}
                  themeFillColor={
                    removeProduct ? "disabled" : "color-primary-500"
                  }
                  size={20}
                />
              </TouchableOpacity>
              <Text category="s1">{product.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleProductQuantity("add", product)}
              >
                <Icon
                  name="plus-outline"
                  themeFillColor="color-primary-500"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
