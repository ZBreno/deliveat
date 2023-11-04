import { View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";

type Itens = {
  name: string;
  quantity: number;
};

type OrderProductProps = {
  name: string;
  itens: Itens[];
  price: number;
};

export default function OrderProduct({
  name,
  itens,
  price,
}: OrderProductProps) {
  const theme = useTheme();
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const handleProductQuantity = (operation: string) => {
    if (productQuantity === 1 && operation === "remove") {
      alert("tem certeza que quer remover o item?");
      setProductQuantity(1);
    } else if (operation === "add") {
      setProductQuantity(productQuantity + 1);
    } else {
      setProductQuantity(productQuantity - 1);
    }
  };

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
            {itens.map(({ name, quantity }, index) => (
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
