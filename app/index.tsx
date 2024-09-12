import { Redirect } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function Index() {
  return (
      <Redirect href={"/hearing"} />
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the background covers the entire screen
    resizeMode: "cover", // Ensures the image covers the entire view
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});
