import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";

const Settings = () => {

  const router = useRouter();
  const handleContact = () => {
    console.log("contact press");
  };
  const handleAbout = () => {
    router.push('/About')

  };
  return (
    <BackgroundImage>
      <View>
        <TouchableOpacity onPress={handleContact}>
          <View className="flex-row items-center gap-4 p-4">
            <MaterialCommunityIcons
              name="email-newsletter"
              size={24}
              color="white"
            />
            <Text className="text-white text-lg font-bold">Contact Us</Text>
          </View>
        </TouchableOpacity>
        <View className="flex mx-auto" style={styles.divider} />
        <TouchableOpacity onPress={handleAbout}>
          <View className="flex-row items-center gap-4 p-4">
            <Entypo name="info-with-circle" size={24} color="white" />
            <Text className="text-white text-lg font-bold">
              About application
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex mx-auto" style={styles.divider} />
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 2,
    width: "90%",
    backgroundColor: "white",
  },
});

export default Settings;
