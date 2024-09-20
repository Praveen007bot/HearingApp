import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import BackgroundImage from "@/components/BackgroundImage";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      // Navigate after successful login
      router.replace({ pathname: "/hearing" });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View className="flex items-center">
          <Image className=" h-[300px]" source={require("./../assets/images/logo.png")}></Image>
        </View>
        <Text className="text-white text-3xl" style={styles.title}>
          Login
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          className="text-white placeholder:text-white "
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="text-white"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text
          onPress={() => router.replace({ pathname: "/SignUpScreen" })}
          style={styles.link}
        >
          Don't have an account? Sign Up
        </Text>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 12 },
  link: { color: "blue", marginTop: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10 },
});

export default LoginScreen;
