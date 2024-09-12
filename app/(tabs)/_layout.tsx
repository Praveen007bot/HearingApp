import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Colors } from "@/constants/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'white',
        headerBackground: () => (
          <Image
            source={require("./../../assets/images/img_background.png")}
            style={styles.headerBackground}
          />
        ),
        tabBarBackground: () => (
          <Image
            source={require("./../../assets/images/img_background.png")}
            style={styles.headerBackground}
          />
        ),
        tabBarStyle: {
            height: 60,
            paddingBottom: 10
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontStyle: "italic"
        }
      }}
    >
      <Tabs.Screen
        name="hearing"
        options={{
          tabBarLabel: "Hearing",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="hearing" size={24} color={color} />
          ),
          headerTitle: "Hearing Test",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Octicons name="stack" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Fontisto name="player-settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default TabLayout;
