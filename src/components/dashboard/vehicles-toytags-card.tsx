import { Button, StyleSheet } from "react-native";

import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing, Styles } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Car } from "lucide-react-native";
import { router } from "expo-router";
import { useDashboardVehiclesToytags } from "@/hooks/use-dashboard";

export default function VehiclesToytagsCard() {
  const { data, isLoading, error } = useDashboardVehiclesToytags();
  const theme = useTheme();

  if (error) {
    return <ThemedText type="code">{error}</ThemedText>;
  }

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <Car size={16} />
          &nbsp; Vehicles & TOYTAGs
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        <HintRow
          title="Vehicles"
          hint={<ThemedText type="code">{data.vehicles}</ThemedText>}
        />
        <HintRow
          title="TOYTAGs"
          hint={<ThemedText type="code">{data.toytags}</ThemedText>}
        />
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardBottomHeader}>
        <Button
          onPress={() => router.navigate("/main/vehicles")}
          title="View All Vehicles & TOYTAGs"
        />
      </ThemedView>
    </ThemedView>
  );
}
