import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { auth } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import BackgroundImage from "@/components/BackgroundImage";

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      // Navigate after successful signup
      router.replace({ pathname: "/LoginScreen" });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <BackgroundImage>
      <View className="text-3xl text-white" style={styles.container}>
      <View className="flex items-center">
          <Image className=" h-[300px]" source={require("./../assets/images/logo.png")}></Image>
        </View>
        <Text className="text-3xl text-white" style={styles.title}>Sign Up</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        <Text
          onPress={() => router.replace({ pathname: "/LoginScreen" })}
          style={styles.link}
        >
          Already have an account? Login
        </Text>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: {marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 12 },
  link: { color: "blue", marginTop: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10 },
});

export default SignUpScreen;
