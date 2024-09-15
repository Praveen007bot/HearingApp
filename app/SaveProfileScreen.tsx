import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import BackgroundImage from "@/components/BackgroundImage";
import { useLocalSearchParams, useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const SaveProfileScreen: React.FC = () => {
  const { leftEarTimeData, rightEarTimeData } = useLocalSearchParams();

  // Safely parse timeData
  const parsedLeftEarData = Array.isArray(leftEarTimeData)
    ? leftEarTimeData
    : JSON.parse(leftEarTimeData || '[]');

  const parsedRightEarData = Array.isArray(rightEarTimeData)
    ? rightEarTimeData
    : JSON.parse(rightEarTimeData || '[]');

  const [profileName, setProfileName] = useState("");
  const [age, setAge] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();

  const analyzeHearing = (earData: number[]) => {
    const threshold = 5;
    return earData.some((time) => time > threshold)
      ? "Deaf or Hearing Impaired"
      : "Normal Hearing";
  };

  const leftEarDiagnosis = analyzeHearing(parsedLeftEarData);
  const rightEarDiagnosis = analyzeHearing(parsedRightEarData);

  const handleSave = () => {
    if (!profileName || !age || !selectedIcon) {
      Alert.alert("Validation Error", "Please complete all fields.");
      return;
    }

    try {
      router.push({
        pathname: "/GraphsScreen",
        params: {
          leftEarTimeData: JSON.stringify(parsedLeftEarData),
          rightEarTimeData: JSON.stringify(parsedRightEarData),
        },
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Error", "An error occurred while saving the profile. Please try again.");
    }
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
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
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
  saveButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: "#A569BD",
    fontWeight: "bold",
    borderRadius: 5,
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
