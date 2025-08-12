import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CommonStyles } from "../../../../components/CommonStyles";
import { db } from "../../../../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SheetsListScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams(); // Get the sheet type from the URL
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

    // Fetch sheets for the specified type
    const collectionName = `${type}Accounts`; // e.g., 'traderAccounts'
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const sheetsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Add a display title if not present
          title:
            doc.data().title ||
            `Sheet from ${new Date(
              doc.data().timestamp.toDate()
            ).toLocaleDateString()}`,
        }));
        setSheets(sheetsData);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch sheets:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [type]);

  const handleSelectSheet = (sheet) => {
    // Navigate to the specific sheet, passing the sheet data
    // We'll update the sheet components to receive this data
    router.push({
      pathname: `/sheets/${type}`,
      params: { sheetId: sheet.id },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading sheets...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Sheets
      </Text>
      {sheets.length === 0 ? (
        <Text style={styles.noSheetsText}>
          No saved sheets found. Start a new one!
        </Text>
      ) : (
        <FlatList
          data={sheets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sheetItem}
              onPress={() => handleSelectSheet(item)}
            >
              <Text style={styles.sheetTitle}>{item.title}</Text>
              <Text style={styles.sheetDetails}>
                Profit/Loss: ₦{item.profitOrLoss?.toFixed(2) || "N/A"}
              </Text>
              <Text style={styles.sheetDate}>
                Date: {item.timestamp?.toDate().toLocaleDateString() || "N/A"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  noSheetsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  sheetItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sheetDetails: {
    fontSize: 16,
    color: "#333",
  },
  sheetDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
