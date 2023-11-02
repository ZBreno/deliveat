import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";

type OrderProps = {
  name: string;
  image: {
    height: number;
    width: number;
    uri: string;
  };
  itens: string;
};

export default function Order({name, image, itens}: OrderProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme["color-bg-stroke"],
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <View>
          <Image
            source={image}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, fontFamily: "Poppins-Medium" }}>
                {name}
              </Text>
              <Text style={{ fontSize: 12, fontFamily: "Poppins-Medium" }}>
                Itens:
              </Text>
              <Text
                style={{ fontSize: 10, fontFamily: "Poppins-Medium" }}
                numberOfLines={3}
              >
                {itens}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", flex: 1 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    color: theme["color-primary-500"],
                    fontSize: 12,
                    fontFamily: "Poppins-Medium",
                    minWidth: 43,
                    maxHeight: 20
                  }}
                >
                  Avaliar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: theme["color-primary-500"],
              fontFamily: "Poppins-Medium",
              fontSize: 12,
            }}
          >
            Ver detalhes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: theme["color-primary-500"],
              fontFamily: "Poppins-Medium",
              fontSize: 12,
            }}
          >
            Comprar novamente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
