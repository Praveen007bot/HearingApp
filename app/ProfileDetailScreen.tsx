import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BackgroundImage from "@/components/BackgroundImage";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
// You would import your graph component here

const ProfileDetailScreen: React.FC = () => {
  const { profileData } = useLocalSearchParams();
  const profileDataString = Array.isArray(profileData)
    ? profileData[0]
    : profileData;
  const profile = profileData ? JSON.parse(profileDataString) : {};

  const firestore = getFirestore();

  const parseEarData = (earData: any) => {
    if (!earData) return [];
    try {
      const parsed = Array.isArray(earData) ? earData : JSON.parse(earData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing ear data:", error);
      return [];
    }
  };

  const parsedLeftEarData = parseEarData(profile.leftEarTimeData);
  const parsedRightEarData = parseEarData(profile.rightEarTimeData);
  
  const auth = getAuth();
    const user = auth.currentUser; // Get the currently logged-in user

    if (!user) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    const userId = user.uid; // Use the user's unique ID

  const deleteProfile = async () => {
    try {
      await deleteDoc(
        doc(firestore, "users", userId, "profiles", profile.id)
      );
      Alert.alert("Success", "Profile deleted successfully.");
      router.back(); // Go back to the profiles list
    } catch (error) {
      console.error("Error deleting profile: ", error);
      Alert.alert("Error", "Failed to delete profile.");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete this profile?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deleteProfile },
      ],
      { cancelable: true }
    );
  };

  return (
    <BackgroundImage>
      <ScrollView style={styles.container}>
        <View className="flex justify-between items-center flex-row">
          <Text className="text-white font-bold text-2xl">
            Profile Details:
          </Text>
          <TouchableOpacity onPress={confirmDelete}>
            <MaterialIcons name="delete" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-lg">Name: {profile.profileName}</Text>
        <Text className="text-white text-lg">Age: {profile.age}</Text>
        <View>
          <View className="flex flex-row items-center justify-between">
            <Text style={styles.chartTitle}>Left Ear Data</Text>
            <Text className="text-base font-bold">
              {profile.leftEarDiagnosis}
            </Text>
          </View>
          <LineChart
            data={{
              labels: parsedLeftEarData.map((_, index) => index.toString()),
              datasets: [{ data: parsedLeftEarData }],
            }}
            width={320}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#7c4dff", // Purple background
              backgroundGradientFrom: "#9c47ff", // Lighter purple
              backgroundGradientTo: "#6a1b9a", // Darker purple
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the line
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the labels
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#7c4dff", // Purple color for dots
              },
            }}
            style={styles.chart}
          />
          <View className="flex flex-row items-center justify-between">
            <Text style={styles.chartTitle}>Right Ear Data</Text>
            <Text className="text-base font-bold">
              {profile.rightEarDiagnosis}
            </Text>
          </View>
          <LineChart
            data={{
              labels: parsedRightEarData.map((_, index) => index.toString()),
              datasets: [{ data: parsedRightEarData }],
            }}
            width={320}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#7c4dff", // Purple background
              backgroundGradientFrom: "#9c47ff", // Lighter purple
              backgroundGradientTo: "#6a1b9a", // Darker purple
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the line
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the labels
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#7c4dff", // Purple color for dots
              },
            }}
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ProfileDetailScreen;
