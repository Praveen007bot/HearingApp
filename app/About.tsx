import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";

const About = () => {
  return (
    <BackgroundImage>
      <View className="flex items-center">
        <Image
        className="mt-16 h-28 w-80"
          source={require("./../assets/images/about_icon.png")}
        />
        <Text className="font-bold text-lg mb-4 mt-2">Version 1.0.0</Text>
        <Text className="text-sm font-medium text-gray-700 mx-4">It is hard to realize that you have problems with your hearing. Regular monitoring of your hearing with the help of our application can assess the level of your hearing and reduce the anxiety you feel thinking about its condition.</Text>
      </View>
    </BackgroundImage>
  );
};



export default About;
