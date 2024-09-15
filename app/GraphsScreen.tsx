import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRouter, useLocalSearchParams } from 'expo-router';

const GraphsScreen: React.FC = () => {
  const { leftEarTimeData, rightEarTimeData } = useLocalSearchParams();

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
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Left Ear Data</Text>
      <LineChart
        data={{
          labels: parsedLeftEarData.map((_, index) => index.toString()),
          datasets: [{ data: parsedLeftEarData }]
        }}
        width={320}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#ffa726',
          backgroundGradientTo: '#fb8c00',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Right Ear Data</Text>
      <LineChart
        data={{
          labels: parsedRightEarData.map((_, index) => index.toString()),
          datasets: [{ data: parsedRightEarData }]
        }}
        width={320}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#ffa726',
          backgroundGradientTo: '#fb8c00',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent'
  },
  chartTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default GraphsScreen;
