import { Stack } from "expo-router";
import PlusButton from "../../../../components/PlusButton";

export default function SheetsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{
          headerTitle: "Past Sheets",
          headerTitleAlign: "center",
          headerRight: () => <PlusButton />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="trader"
        options={{
          headerTitle: "Trader Sheet",
          headerTitleAlign: "center",
          headerRight: () => <PlusButton />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="artisan"
        options={{
          headerTitle: "Artisan Sheet",
          headerTitleAlign: "center",
          headerRight: () => <PlusButton />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="salary"
        options={{
          headerTitle: "Salary Sheet",
          headerTitleAlign: "center",
          headerRight: () => <PlusButton />,
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
}
