import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

// A component that handles navigation based on auth state
function RootStack() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      // User is logged in, navigate to main app
      router.replace("/(app)");
    } else if (!user && !inAuthGroup) {
      // User is not logged in, navigate to auth screens
      router.replace("/(auth)");
    }
  }, [user, loading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootStack />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
