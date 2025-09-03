// app/(auth)/login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonStyles } from "../../components/CommonStyles";
import { Ionicons } from "@expo/vector-icons"

const CURRENCIES = [
  { label: "Nigerian Naira (₦)", value: "NGN" },
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
  { label: "British Pound (£)", value: "GBP" },
];

export default function LoginPage() {
  const {
    signInWithGoogle,
    signInWithFacebook,
    loading: authLoading,
  } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [socialLoading, setSocialLoading] = useState(false);
  const logo = require("../../assets/images/icon.png");

  const handleGoogleSignIn = async () => {
    setSocialLoading(true);
    try {
      await signInWithGoogle();
      await AsyncStorage.setItem("userCurrency", selectedCurrency);
      Alert.alert(
        "Login Success",
        "You've signed in with Google! Navigating to app."
      );
    } catch (e) {
      console.error("Google sign-in failed:", e);
      Alert.alert("Login Failed", "There was an issue signing in with Google.");
    } finally {
      setSocialLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setSocialLoading(true);
    try {
      await signInWithFacebook();
      await AsyncStorage.setItem("userCurrency", selectedCurrency);
      Alert.alert(
        "Login Success",
        "You've signed in with Facebook! Navigating to app."
      );
    } catch (e) {
      console.error("Facebook sign-in failed:", e);
      Alert.alert(
        "Login Failed",
        "There was an issue signing in with Facebook."
      );
    } finally {
      setSocialLoading(false);
    }
  };

  if (authLoading || socialLoading) {
    return (
      <SafeAreaView style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Signing in...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={CommonStyles.logoContainer}>
        <Image source={logo} style={CommonStyles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.welcomeText}>Welcome to AFO!</Text>
      <Text style={styles.sloganText}>Your simple profit/loss calculator.</Text>

      <View style={styles.currencySelectorContainer}>
        <Text style={styles.currencyLabel}>Select Your Default Currency:</Text>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {CURRENCIES.map((currency) => (
            <Picker.Item
              key={currency.value}
              label={currency.label}
              value={currency.value}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.socialButton, styles.googleButton]}
        onPress={handleGoogleSignIn}
      >
        <Ionicons name="logo-google" size={24} color="#333" />
        <Text style={[styles.socialButtonText, styles.googleButtonText]}>
          Sign In with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={handleFacebookSignIn}
      >
        <Ionicons name="logo-facebook" size={27} color="#fff" />
        <Text style={[styles.socialButtonText, styles.facebookButtonText]}>
          Sign In with Facebook
        </Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By signing in, you agree to our Terms of Service.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    color: "#333",
  },
  sloganText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
  currencySelectorContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  currencyLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  facebookButton: {
    backgroundColor: "#1877f2",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButtonText: {
    color: "#333",
  },
  facebookButtonText: {
    color: "#fff",
  },
  termsText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff",
  },
});
