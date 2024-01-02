import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";
import useAsyncStorage from "../../hooks/useAsyncStorage";

type Itens = {
  name: string;
  quantity: number;
};

type OrderProductProps = {
  name: string;
  itens: Itens[];
  price: number;
  quantity: number;
  id: string;
};

export default function OrderProduct({
  name,
  itens,
  price,
  quantity,
  id,
}: OrderProductProps) {
  const theme = useTheme();
  const [productQuantity, setProductQuantity] = useState<number>(quantity);
  const [shoppingCart, setShoppingCart] = useAsyncStorage("@ue:shopping-cart");
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleProductQuantity = (operation: string) => {
    if (productQuantity === 1 && operation === "remove") {
      setShoppingCart((prev) => {
        const updatedCart = { ...prev };
        delete updatedCart[id];
        return updatedCart;
      });

      ToastAndroid.show("Produto removido da sacola!", ToastAndroid.SHORT);
    } else if (operation === "add") {
      setShoppingCart((prev) => {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            quantity: productQuantity + 1,
          },
        };
      });
      setProductQuantity(productQuantity + 1);
    } else {
      setShoppingCart((prev) => {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            quantity: productQuantity - 1,
          },
        };
      });
      setProductQuantity(productQuantity - 1);
    }
  };

  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [shoppingCart]);

  const removeProduct = productQuantity === 1;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/bakery-category.png")}
          style={{
            width: 120,
            height: 80,
            resizeMode: "cover",
            borderRadius: 8,
          }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text category="s1">{name}</Text>
          <View>
            {itens &&
              itens.map(({ name, quantity }, index) => (
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
                R$ {(price * productQuantity).toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={() => handleProductQuantity("remove")}>
                <Icon
                  name={removeProduct ? "trash-2-outline" : "minus-outline"}
                  themeFillColor={
                    removeProduct ? "disabled" : "color-primary-500"
                  }
                  size={20}
                />
              </TouchableOpacity>
              <Text category="s1">{productQuantity}</Text>
              <TouchableOpacity onPress={() => handleProductQuantity("add")}>
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
