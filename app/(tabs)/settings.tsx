import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import * as Linking from 'expo-linking';

const Settings = () => {

  const router = useRouter();

  const auth = getAuth(); // Initialize Firebase Auth

  // Handle contact press (placeholder for functionality)
  const handleContact = () => {
    const email = "veereshsmart831@gmail.com.com"; // Your support email
    const subject = "Support Request"; // Pre-filled subject
    const body = "Hi, I need help with..."; // Pre-filled email body

    // Construct the mailto link
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the mail app with the constructed mailto link
    Linking.openURL(mailUrl).catch((err) => {
      console.error("Failed to open mail client:", err);
      Alert.alert("Error", "Could not open mail client. Please try again.");
    });
  };

  // Navigate to About screen
  const handleAbout = () => {
    router.push("/About");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      Alert.alert("Logged out", "You have been successfully logged out.");
      router.replace("/LoginScreen"); // Navigate to the login screen
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Logout Error", "Failed to log out. Please try again.");
    }
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
        <TouchableOpacity onPress={handleLogout}>
          <View className="flex-row items-center gap-4 p-4">
            <MaterialCommunityIcons name="logout" size={24} color="white" />
            <Text className="text-white text-lg font-bold">Logout</Text>
          </View>
        </TouchableOpacity>
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
