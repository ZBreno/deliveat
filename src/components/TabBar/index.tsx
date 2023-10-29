import React, { useState } from "react";
import { Tab, TabBar, Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";

const TabBarComponent = ({ state, navigation, descriptors }) => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabPress = (index) => {
    const selectedRoute = state.routes[index];

    const event = navigation.emit({
      type: "tabPress",
      target: selectedRoute.key,
      canPreventDefault: true,
    });

    if (index !== state.index && !event.defaultPrevented) {
      navigation.navigate({
        name: selectedRoute.name,
        merge: true,
      });
    }
    setSelectedTab(index);
  };

  return (
    <TabBar
      selectedIndex={selectedTab}
      onSelect={handleTabPress}
      style={{
        paddingVertical: 6,
        borderTopWidth: 1,
        borderColor: theme["color-bg-stroke"],
      }}
      indicatorStyle={{ backgroundColor: theme["color-orange-primary"] }}
    >
      {state.routes.map((route, index) => {
        let iconName;
        if (route.name === "HomeTab") {
          iconName = "home-outline";
        } else if (route.name === "SearchTab") {
          iconName = "search-outline";
        } else if (route.name === "OrderTab") {
          iconName = "cube-outline";
        } else if (route.name === "ShopTab") {
          iconName = "shopping-bag-outline";
        } else if (route.name === "ProfileTab") {
          iconName = "person-outline";
        }
        const focused = index === selectedTab;

        return (
          <Tab
            key={route.key}
            title={() => (
              <Text
                category={focused ? "label" : "c2"}
                style={{
                  color: focused
                    ? theme["color-orange-primary"]
                    : theme["color-text"],
                }}
              >
                {descriptors[route.key].options.title}
              </Text>
            )}
            icon={() => (
              <Icon
                name={iconName}
                size={24}
                themeFillColor={focused ? "color-orange-primary" : "color-text"}
              />
            )}
          />
        );
      })}
    </TabBar>
  );
};

export default TabBarComponent;
