import { Stack } from "expo-router";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="LoginScreen" options={{headerShown: false}}/>
      <Stack.Screen name="SignUpScreen" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="testing" />
    </Stack>
  );
}
