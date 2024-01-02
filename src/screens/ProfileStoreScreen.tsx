import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Divider,
  Layout,
  Text,
  ViewPager,
  useTheme,
} from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamlist } from "../navigators/HomeStack";
import Icon from "../components/Icon";
import { useGetStore } from "../hooks/user";
import { useGetMyProducts } from "../hooks/products";
import LoadingContainer from "../components/LoadingContainer";
import useAsyncStorage from "../hooks/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProfileStoreScreenProps = StackScreenProps<
  HomeStackParamlist,
  "ProfileStore"
>;

export default function ProfileStoreScreen({ route }: ProfileStoreScreenProps) {
  const theme = useTheme();
  const storeUUID = route.params.uuid;
  const { isPending: isPendingStore, data: store } = useGetStore(storeUUID);
  const { isPending: isPendingProducts, data: products } =
    useGetMyProducts(storeUUID);

  const [shoppingCart, setShoppingCart] = useAsyncStorage(
    "@ue:shopping-cart",
    {}
  );

  if (isPendingStore || isPendingProducts) {
    return <LoadingContainer />;
  }

  const handleShoppingCart = (product) => {
    setShoppingCart((prev) => {
      const existingProduct = prev[product.id];

      if (existingProduct) {
        return {
          ...prev,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          },
        };
      } else {
        return {
          ...prev,
          [product.id]: {
            ...product,
            quantity: 1,
          },
        };
      }
    });

    ToastAndroid.show("Produto adicionado na sacola", ToastAndroid.SHORT);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
      <HeaderNavigation
        childrenLeft={<ArrowBack />}
        childrenCenter={<View />}
        childrenRight={
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Icon name="search" themeFillColor="color-primary-500" size={24} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Text
              style={{
                color: theme["color-text"],
                fontFamily: "Poppins-Medium",
              }}
            >
              {store.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="star" themeFillColor="color-text" size={14} />
              <Text
                category="h4"
                style={{
                  color: theme["color-text"],
                  fontSize: 10,
                  textAlign: "center",
                  marginTop: 2,
                }}
              >
                {4.5}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text
              style={{
                color: theme["color-text"],
                fontFamily: "Poppins-Medium",
                fontSize: 12,
              }}
            >
              Aberto até ás 22:00{" "}
            </Text>
            <View
              style={{
                backgroundColor: theme["color-text"],
                width: 5,
                height: 5,
                alignItems: "center",
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                color: theme["color-text"],
                fontFamily: "Poppins-Medium",
                fontSize: 12,
              }}
            >
              Pedido min. R$ 15,00
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${store.profile_picture}`,
            }}
            style={{ width: 70, height: 70 }}
            borderRadius={35}
          />
        </View>
      </View>

      <Divider
        style={{
          backgroundColor: theme["color-border"],
          marginTop: 16,
          marginBottom: 16,
        }}
      />

      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 32,
          }}
          onPress={() => handleShoppingCart(product)}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16 }}>
              {product.name}
            </Text>
            <Text style={{ fontSize: 12 }} numberOfLines={3}>
              {product.description}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 14,
                color: theme["color-success-900"],
              }}
            >
              R$ {product.cost}
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${product.image}`,
              }}
              style={{ width: 106, height: 84, borderRadius: 16 }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
});
