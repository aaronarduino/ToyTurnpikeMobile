import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing, Styles } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Car } from "lucide-react-native";
import { IVehicle } from "@/interfaces/api-interfaces";
import { useVehicles } from "@/hooks/use-vehicles";

export default function VehiclesCard() {
  const { data, isLoading, error } = useVehicles();
  const theme = useTheme();

  if (error) {
    return <ThemedText type="code">{error}</ThemedText>;
  }

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <Car size={16} />
          &nbsp; Vehicles
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        {data?.vehicles.map((item: IVehicle) => {
          return (
            <ThemedText key={item._id} type="small">
              {item.state}-{item.plate_number}
            </ThemedText>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}
