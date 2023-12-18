import { View, FlatList, ScrollView, TouchableOpacity } from "react-native";
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

export type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamlist, "Home">,
  StackScreenProps<NotificationStackParamList>
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const categories = [
    {
      title: "Restaurantes",
      width: 80,
      height: 58,
      source: require("../assets/restaurant-category.png"),
    },
    {
      title: "Bebidas",
      width: 80,
      height: 58,
      source: require("../assets/drinks-category.png"),
    },
    {
      title: "Padarias",
      width: 80,
      height: 58,
      source: require("../assets/bakery-category.png"),
    },
    {
      title: "Lanchonetes",
      width: 80,
      height: 58,
      source: require("../assets/snackbar-category.png"),
    },
    {
      title: "Lanchonetes1",
      width: 80,
      height: 58,
      source: require("../assets/snackbar-category.png"),
    },
  ];

  const tickets = [
    {
      title: "15%",
      role: "válido apenas para primeira compra",
      deadline: "08/09/2024",
    },
    {
      title: "30%",
      role: "válido apenas para primeira compra",
      deadline: "08/09/2024",
    },
  ];

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
  const stories = [
    {
      image: require('../assets/bakery-category.png'),
      name: 'McDonalds',
      category: 'Restaurante',
      open: true,
      time: '20-30min',
      cost_delivery: '7,00',
      rate: '4.8'
    },
    {
      image: require('../assets/snackbar-category.png'),
      name: 'Burguer King',
      category: 'Restaurante',
      open: true,
      time: '20-30min',
      cost_delivery: '7,00',
      rate: '4.8'
    },
    {
      image: require('../assets/restaurant-category.png'),
      name: 'Subway',
      category: 'Restaurante',
      open: false,
      time: '20-30min',
      cost_delivery: '7,00',
      rate: '4.8'
    },
  ]
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
        childrenLeft={<LocationUser/>}
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
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => alert("dasd")}
              style={{ marginRight: 16 }}
            >
              <Category
                title={item.title}
                width={item.width}
                height={item.height}
                source={item.source}
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
        {tickets.map(({ title, deadline, role }, index) => (
          <Ticket key={index} title={title} role={role} deadline={deadline} />
        ))}
      </View>

      <Text style={{ marginBottom: 12 }} category="s1">
        Estabelecimentos mais populares
      </Text>
      <View style={{ marginBottom: 24 }}>
        <FlatList
          data={est}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => alert("dasd")}
              style={{ marginRight: 16 }}
            >
              <Establishment title={item.title} source={item.source} />
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={{ marginBottom: 12 }} category="s1">
        Lojas
      </Text>

      <View style={{ gap: 16, marginBottom: 24 }}>
        {stories.map(({ name, category, cost_delivery, image, open, rate, time }, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ProfileStore')}>
          <Store  name={name} category={category} cost_delivery={cost_delivery} image={image} open={open} rate={rate} time={time}/>
          </TouchableOpacity>
        ))}
      </View>
      
    
    </ScrollView>
  );
}
