import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Index() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Checking auth...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Home</Text>

      {user ? (
        <>
          <Text style={styles.subtitle}>
            Logged in as{"\n"}
            <Text style={styles.email}>{user.email}</Text>
          </Text>
          <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <Text style={styles.btnText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.subtitle}>You are not logged in.</Text>
      )}

      <TouchableOpacity style={styles.linkBtn} onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>Go to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.link}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  email: { fontWeight: "600" },
  btn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: { color: "white", fontWeight: "600" },
  linkBtn: { marginTop: 5 },
  link: { color: "#007AFF", fontSize: 16 },
});