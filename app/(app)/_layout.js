import { Stack } from "expo-router";
import { HeaderButton } from "../../components/HeaderButton"; // Create this component
import { useAuth } from "../../context/AuthContext";

export default function AppLayout() {
  const { signOut } = useAuth();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sheets/list"
        options={{
          headerTitle: "Past Sheets",
          headerRight: () => <HeaderButton title="Logout" onPress={signOut} />,
        }}
      />
      <Stack.Screen
        name="sheets/trader"
        options={{
          headerTitle: "Trader Sheet",
          headerRight: () => <HeaderButton title="Logout" onPress={signOut} />,
        }}
      />
      <Stack.Screen
        name="sheets/artisan"
        options={{
          headerTitle: "Artisan Sheet",
          headerRight: () => <HeaderButton title="Logout" onPress={signOut} />,
        }}
      />
      <Stack.Screen
        name="sheets/salary"
        options={{
          headerTitle: "Salary Sheet",
          headerRight: () => <HeaderButton title="Logout" onPress={signOut} />,
        }}
      />
    </Stack>
  );
}
