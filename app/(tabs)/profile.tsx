import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import BackgroundImage from "@/components/BackgroundImage"; // Assuming you have a background image component

const ProfileScreen: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        const userId = user.uid;
        const profilesCollection = collection(firestore, "users", userId, "profiles"); // Firestore path to subcollection
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
      <View style={styles.container}>
        <Text style={styles.header}>Your Saved Profiles</Text>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.profileItem}>
              <Text style={styles.profileName}>{item.profileName}</Text>
              <Text style={styles.profileDetails}>Age: {item.age}</Text>
              <Text style={styles.profileDetails}>
                Left Ear Diagnosis: {item.leftEarDiagnosis}
              </Text>
              <Text style={styles.profileDetails}>
                Right Ear Diagnosis: {item.rightEarDiagnosis}
              </Text>
              {/* Add any other details you want to display here */}
            </View>
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
  profileItem: {
    backgroundColor: "#A569BD",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileDetails: {
    fontSize: 16,
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
});

export default ProfileScreen;
