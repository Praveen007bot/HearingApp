import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import BackgroundImage from "@/components/BackgroundImage";
import { useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ResultsPage: React.FC = () => {
  const { leftEarTimeData, rightEarTimeData } = useLocalSearchParams();

  // Safely parse the time data from the previous screen
  const parsedLeftEarData = Array.isArray(leftEarTimeData)
    ? leftEarTimeData
    : JSON.parse(leftEarTimeData || "[]");

  const parsedRightEarData = Array.isArray(rightEarTimeData)
    ? rightEarTimeData
    : JSON.parse(rightEarTimeData || "[]");

  const [profileName, setProfileName] = useState("Profile1");
  const [age, setAge] = useState("12 September 2024");
  const [selectedIcon, setSelectedIcon] = useState<string | null>("users");

  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isAgeDeviationOpen, setIsAgeDeviationOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleSection = (section: string) => {
    switch (section) {
      case "degree":
        setIsDegreeOpen(!isDegreeOpen);
        break;
      case "description":
        setIsDescriptionOpen(!isDescriptionOpen);
        break;
      case "age":
        setIsAgeDeviationOpen(!isAgeDeviationOpen);
        break;
      case "compare":
        setIsCompareOpen(!isCompareOpen);
        break;
    }
  };
  const validLeftEarData =
    Array.isArray(parsedLeftEarData) && parsedLeftEarData.length > 0
      ? parsedLeftEarData
      : [0, 0, 0, 0, 0, 0, 0]; // Default to an array of 7 zeros if data is invalid

  const validRightEarData =
    Array.isArray(parsedRightEarData) && parsedRightEarData.length > 0
      ? parsedRightEarData
      : [0, 0, 0, 0, 0, 0, 0]; // Default to an array of 7 zeros if data is invalid

  return (
    <BackgroundImage>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Saving the profile</Text>

        {/* Left and Right Ear Graphs */}
        <View style={styles.graphContainer}>
          <View style={styles.chartWrapper}>
            <Text style={styles.chartLabel}>LEFT</Text>
            <LineChart
              data={{
                labels: ["125", "250", "500", "1k", "2k", "4k", "8k"], // Frequency labels
                datasets: [{ data: validLeftEarData }], // Use validated data
              }}
              width={Math.max(screenWidth / 2 - 20, 0)} // Ensure width is positive
              height={220}
              yAxisSuffix="dB"
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />

            <LineChart
              data={{
                labels: ["125", "250", "500", "1k", "2k", "4k", "8k"], // Frequency labels
                datasets: [{ data: validRightEarData }], // Use validated data
              }}
              width={Math.max(screenWidth / 2 - 20, 0)} // Ensure width is positive
              height={220}
              yAxisSuffix="dB"
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />
          </View>
          <View style={styles.chartWrapper}>
            <Text style={styles.chartLabel}>RIGHT</Text>
            <LineChart
              data={{
                labels: ["125", "250", "500", "1k", "2k", "4k", "8k"],
                datasets: [
                  { data: parsedRightEarData || [0, 0, 0, 0, 0, 0, 0] },
                ],
              }}
              width={screenWidth / 2 - 20}
              height={220}
              yAxisSuffix="dB"
              chartConfig={chartConfig}
              bezier
              style={styles.chartStyle}
            />
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.profileInfo}>
          <FontAwesome5 name={selectedIcon || "users"} size={40} color="#fff" />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileDate}>{age}</Text>
          </View>
        </View>

        {/* Collapsible Sections */}
        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("degree")}
        >
          <Text style={styles.sectionText}>Degree of hearing impairment</Text>
          {isDegreeOpen && (
            <Text style={styles.sectionContent}>
              Details about the degree of impairment
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("description")}
        >
          <Text style={styles.sectionText}>Description</Text>
          {isDescriptionOpen && (
            <Text style={styles.sectionContent}>
              Description of the hearing test results.
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("age")}
        >
          <Text style={styles.sectionText}>Age deviations</Text>
          {isAgeDeviationOpen && (
            <Text style={styles.sectionContent}>
              Details about age-related deviations in hearing.
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleSection("compare")}
        >
          <Text style={styles.sectionText}>Compare</Text>
          {isCompareOpen && (
            <Text style={styles.sectionContent}>
              Comparison of hearing data over time.
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </BackgroundImage>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  graphContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  chartWrapper: {
    flex: 1,
    alignItems: "center",
  },
  chartLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 16,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileText: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 20,
    color: "#fff",
  },
  profileDate: {
    fontSize: 14,
    color: "#fff",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B0082",
  },
  sectionContent: {
    marginTop: 10,
    color: "#333",
  },
});

export default ResultsPage;
