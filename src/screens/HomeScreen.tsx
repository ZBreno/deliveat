import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import Category from "../components/Category";
import HeaderNavigation from "../components/HeaderNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamlist } from "../navigators/HomeStack";
import { CompositeScreenProps } from "@react-navigation/native";
import { NotificationStackParamList } from "../navigators/NotificationStack";
import NotificationTicket from "../components/NotificationIcon";
import Ticket from "../components/Ticket";
import Establishment from "../components/Establishment";
import Store from "../components/Store";
import LocationUser from "../components/LocationUser";
import { useGetCategories } from "../hooks/categories";
import LoadingContainer from "../components/LoadingContainer";
import { useGetEstablishment, useGetUsers } from "../hooks/user";
import { useGetTickets } from "../hooks/ticket";

export type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamlist, "Home">,
  StackScreenProps<NotificationStackParamList>
>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { isPending: isPendingCategory, data: categories } = useGetCategories();
  const { isPending: isPendingUsers, data: stories } = useGetUsers();
  const { isPending: isPendingEstablishment, data: establishment } =
    useGetEstablishment();
  const { isPending: isPendingTickets, data: tickets } = useGetTickets();

  const est = [
    {
      title: "Subway",
      source: require("../assets/restaurant-category.png"),
    },
    {
      title: "McDonalds",
      source: require("../assets/bakery-category.png"),
    },
    {
      title: "Burguer King",
      source: require("../assets/drinks-category.png"),
    },
    {
      title: "Habib's",
      source: require("../assets/snackbar-category.png"),
    },
    {
      title: "Subway2",
      source: require("../assets/restaurant-category.png"),
    },
    {
      title: "McDonalds2",
      source: require("../assets/bakery-category.png"),
    },
    {
      title: "Burguer King2",
      source: require("../assets/drinks-category.png"),
    },
    {
      title: "Habib's2",
      source: require("../assets/snackbar-category.png"),
    },
  ];

  if (
    isPendingCategory ||
    isPendingUsers ||
    isPendingTickets ||
    isPendingEstablishment
  ) {
    return <LoadingContainer />;
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <HeaderNavigation
        childrenLeft={<LocationUser />}
        childrenRight={<NotificationTicket />}
      />

      {/* <View style={{ flexDirection: "row", gap: 16 }}>
        {categories.map(({ title, width, height, source }, index) => (
          <TouchableOpacity key={index}>
            <Category
              title={title}
              width={width}
              height={height}
              source={source}
            />
          </TouchableOpacity>
        ))}
      </View> */}
      <View style={{ marginBottom: 24 }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => alert("dasd")}
              style={{ marginRight: 16 }}
            >
              <Category
                title={item.name}
                width={80}
                height={58}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${item.image}`,
                }}
                borderRadius={8}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={{ marginBottom: 12 }} category="s1">
        Cupons disponíveis
      </Text>
      <View style={{ gap: 16, marginBottom: 24 }}>
        {(tickets || []).map(
          ({ title, deadline, description, discount, code }, index) => (
            <Ticket
              key={index}
              title={title}
              description={description}
              deadline={deadline}
              discount={discount}
              code={code}
            />
          )
        )}
      </View>

      <Text style={{ marginBottom: 12 }} category="s1">
        Estabelecimentos mais populares
      </Text>
      <View style={{ marginBottom: 24 }}>
        <FlatList
          data={establishment}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() =>
                navigation.navigate("ProfileStore", { uuid: item.id })
              }
              style={{ marginRight: 16 }}
            >
              <Establishment
                title={item.name}
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${item.profile_picture}`,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={{ marginBottom: 12 }} category="s1">
        Lojas
      </Text>

      <View style={{ gap: 16, marginBottom: 24 }}>
        {stories.map(({ name, profile_picture, id }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              index % 2 == 0
                ? navigation.navigate("ProfileStore", { uuid: id })
                : ToastAndroid.show("Loja fechada", ToastAndroid.SHORT);
            }}
          >
            <Store
              name={name}
              category={"Restaurante"}
              cost_delivery={`R$ 10.00`}
              image={{
                uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${profile_picture}`,
              }}
              open={index % 2 == 0}
              rate={(Math.floor(Math.random() * 51) / 10).toFixed(1)}
              time={"calma"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
("");
