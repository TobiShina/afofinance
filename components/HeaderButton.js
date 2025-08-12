// components/HeaderButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function HeaderButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  text: {
    color: "#007AFF", // Example blue
    fontSize: 16,
  },
});
