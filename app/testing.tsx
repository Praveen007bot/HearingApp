import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { Audio } from "expo-av";
import { ProgressBar } from "react-native-paper";
import { SVGComponent } from "@/components/SVGComponent";
import BackgroundImage from "@/components/BackgroundImage";

const soundFiles: { [key: number]: any } = {
  1: require("../assets/sounds/tone_1Hz.mp3"),
  2: require("../assets/sounds/tone_2Hz.mp3"),
  3: require("../assets/sounds/tone_3Hz.mp3"),
  4: require("../assets/sounds/tone_4Hz.mp3"),
  5: require("../assets/sounds/tone_5Hz.mp3"),
  6: require("../assets/sounds/tone_6Hz.mp3"),
  7: require("../assets/sounds/tone_7Hz.mp3"),
  8: require("../assets/sounds/tone_8Hz.mp3"),
};

const MAX_LEVEL = 8;

const Testing: React.FC = () => {
  const [currentEar, setCurrentEar] = useState<"left" | "right">("left");
  const [level, setLevel] = useState<number>(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [testingCompleted, setTestingCompleted] = useState<boolean>(false);

  // Function to play sound
  const playSound = async (level: number): Promise<void> => {
    const soundFile = soundFiles[level];

    if (!soundFile) {
      Alert.alert("Sound file not found");
      return;
    }

    // Unload previous sound if any
    if (sound) {
      await sound.unloadAsync();
    }

    // Load new sound
    const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
    setSound(newSound);

    // Play sound
    await newSound.playAsync();
  };

  const handleNext = async (): Promise<void> => {
    if (level < MAX_LEVEL) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      await playSound(nextLevel);
    } else {
      if (currentEar === "left") {
        // Left ear testing completed, switch to right ear
        setCurrentEar("right");
        setLevel(1);
        Alert.alert("Left ear testing completed. Proceeding to right ear.");
        await playSound(1);
      } else {
        // Both ears tested
        setTestingCompleted(true);
        Alert.alert("Testing completed for both ears!");
      }
    }
  };

  // Unload sound on component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  if (testingCompleted) {
    return (
      <View>
        <Text style={styles.title}>Hearing Test Completed</Text>
        <Text style={styles.message}>
          Thank you for completing the hearing test.
        </Text>
        {/* Additional summary or navigation can be added here */}
      </View>
    );
  }

  return (
    <BackgroundImage>
      <View className="my-auto">
        <View className="flex items-center">
          <SVGComponent activeEar={currentEar} />
        </View>
        <View className="mt-10">
          <Text style={styles.title}>Hearing Test</Text>
          <Text style={styles.subtitle}>
            Testing {currentEar === "left" ? "Left Ear" : "Right Ear"}
          </Text>
          <Text style={styles.levelText}>
            Level: {level} / {MAX_LEVEL}
          </Text>
          <ProgressBar
            progress={level / MAX_LEVEL}
            style={styles.progressBar}
          />
          <View  className="flex items-center">
            <TouchableNativeFeedback onPress={handleNext}>
              <Text className="bg-white text-purple-600 text-lg w-24 px-4 py-2 text-center rounded-full">
                Next
              </Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#343A40",
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    color: "#495057",
  },
  levelText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#6C757D",
  },
  progressBar: {
    height: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#495057",
  },
});

export default Testing;
