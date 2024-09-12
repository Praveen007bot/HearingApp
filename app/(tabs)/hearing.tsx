import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Redirect, useRouter } from "expo-router";
import BackgroundImage from "@/components/BackgroundImage";

const Hearing = () => {
  const router = useRouter();

  return (
    <BackgroundImage>
      <View className="flex-1 items-center justify-evenly">
        <View className="flex items-center">
          <MaterialIcons name="info" size={38} color="white" />
          <Text className="flex items-center text-center w-[75vw] text-base mt-4 text-white ">
            Watch the condation of your hearing! tone audiometry method is used
            for the test.
          </Text>
        </View>
        <View style={styles.divider} />
        <View className="flex items-center">
          <TouchableOpacity onPress={() => router.push("/testing")}>
            <AntDesign name="pluscircleo" size={160} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-md">
            Press to start the test
          </Text>
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 2,
    width: "80%",
    backgroundColor: "white",
    marginVertical: 20,
  },
});

export default Hearing;
