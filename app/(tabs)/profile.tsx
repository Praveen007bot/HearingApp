import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router"; // Import useRouter
import BackgroundImage from "@/components/BackgroundImage"; // Assuming you have a background image component
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        const userId = user.uid;
        const profilesCollection = collection(
          firestore,
          "users",
          userId,
          "profiles"
        ); // Firestore path to subcollection
        try {
          const querySnapshot = await getDocs(profilesCollection);
          const profilesList: any[] = [];
          querySnapshot.forEach((doc) => {
            profilesList.push({ id: doc.id, ...doc.data() });
          });
          setProfiles(profilesList);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profiles: ", error);
          setLoading(false);
        }
      }
    };

    fetchProfiles();
  }, [user, profiles]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#A569BD" />
      </View>
    );
  }

  if (profiles.length === 0) {
    return (
      <BackgroundImage>
        <View style={styles.centered}>
          <Text style={styles.noProfilesText}>No profiles found.</Text>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage>
      <View className="mt-4">
        <Text style={styles.header}>Your Saved Profiles</Text>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex"
              onPress={() =>
                router.push({
                  pathname: "/ProfileDetailScreen", // Navigate to ProfileDetailScreen
                  params: {
                    profileData: JSON.stringify(item), // Pass profile data as string
                  },
                })
              }
            >
              <View className="flex flex-row items-center gap-4 ml-2">
                <View style={[styles.iconWrapper]}>
                  <FontAwesome name="user" size={24} color="purple" />
                </View>
                <View>
                  <Text style={styles.profileName}>{item.profileName}</Text>
                  <Text style={styles.profileDetails}>Age: {item.age}</Text>
                </View>
              </View>
              <View className="flex items-center">
                <View className="my-2" style={styles.divider} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  profileDetails: {
    fontSize: 14,
    color: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProfilesText: {
    fontSize: 18,
    color: "#fff",
  },
  divider: {
    height: 2,
    width: "90%",
    backgroundColor: "white",
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
