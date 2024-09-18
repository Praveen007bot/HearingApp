import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import BackgroundImage from "@/components/BackgroundImage";

const GraphsScreen: React.FC = () => {
  const {
    leftEarTimeData,
    rightEarTimeData,
    leftEarDiagnosis,
    rightEarDiagnosis,
  } = useLocalSearchParams();

  // Parse timeData safely
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

  const parsedLeftEarData = parseEarData(leftEarTimeData);
  const parsedRightEarData = parseEarData(rightEarTimeData);

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View className="flex flex-row items-center justify-between">
          <Text style={styles.chartTitle}>Left Ear Data</Text>
          <Text className="text-base font-bold">{leftEarDiagnosis}</Text>
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
          <Text className="text-base font-bold">{rightEarDiagnosis}</Text>
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
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "transparent",
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

export default GraphsScreen;
