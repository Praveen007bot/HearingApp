import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import BackgroundImage from "@/components/BackgroundImage";
import { useLocalSearchParams, useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const SaveProfileScreen: React.FC = () => {
  const { leftEarTimeData, rightEarTimeData } = useLocalSearchParams();

  // Parse timeData from the previous screen for both ears
  const parsedLeftEarData = Array.isArray(leftEarTimeData)
    ? leftEarTimeData
    : JSON.parse(leftEarTimeData);
  const parsedRightEarData = Array.isArray(rightEarTimeData)
    ? rightEarTimeData
    : JSON.parse(rightEarTimeData);

  const [profileName, setProfileName] = useState("");
  const [age, setAge] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();

  // Function to analyze hearing data for both ears
  const analyzeHearing = (earData: number[]) => {
    const threshold = 5; // Threshold for reaction time (in seconds)
    const hearingImpaired = earData.some((time: number) => time > threshold);
    return hearingImpaired ? "Deaf or Hearing Impaired" : "Normal Hearing";
  };

  const leftEarDiagnosis = analyzeHearing(parsedLeftEarData); // Analyze left ear
  const rightEarDiagnosis = analyzeHearing(parsedRightEarData); // Analyze right ear

  const handleSave = () => {
    if (!profileName || !age || !selectedIcon) {
      alert("Please complete all fields.");
      return;
    }
    console.log({ profileName, age, selectedIcon });
    router.push({
      pathname: "/GraphsScreen",
      params: {
        leftEarTimeData: JSON.stringify(leftEarTimeData),
        rightEarTimeData: JSON.stringify(rightEarTimeData),
      },
    });
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={styles.header}>Saving the Profile</Text>

        <Text style={styles.subheader}>Choose an appropriate icon</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity
            style={[
              styles.iconWrapper,
              selectedIcon === "car" && styles.selectedIcon,
            ]}
            onPress={() => setSelectedIcon("car")}
          >
            <FontAwesome5
              name="car"
              size={30}
              color={selectedIcon === "car" ? "#A569BD" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconWrapper,
              selectedIcon === "glass" && styles.selectedIcon,
            ]}
            onPress={() => setSelectedIcon("glass")}
          >
            <FontAwesome5
              name="glass-martini-alt"
              size={30}
              color={selectedIcon === "glass" ? "#A569BD" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconWrapper,
              selectedIcon === "home" && styles.selectedIcon,
            ]}
            onPress={() => setSelectedIcon("home")}
          >
            <FontAwesome5
              name="home"
              size={30}
              color={selectedIcon === "home" ? "#A569BD" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconWrapper,
              selectedIcon === "users" && styles.selectedIcon,
            ]}
            onPress={() => setSelectedIcon("users")}
          >
            <FontAwesome5
              name="users"
              size={30}
              color={selectedIcon === "users" ? "#A569BD" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter the name of the profile"
          value={profileName}
          onChangeText={setProfileName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter the age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleSave}>
            <Text className="bg-white px-4 py-2 text-lg text-purple-600 font-bold rounded-md">
              Save
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display diagnosis for both ears */}
        <Text style={styles.diagnosis}>Left Ear Diagnosis: {leftEarDiagnosis}</Text>
        <Text style={styles.diagnosis}>Right Ear Diagnosis: {rightEarDiagnosis}</Text>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subheader: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#A569BD",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIcon: {
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  diagnosis: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SaveProfileScreen;
