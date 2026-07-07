import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing, Styles } from "@/constants/theme";
import { Tags } from "lucide-react-native";
import { IToytag } from "@/interfaces/api-interfaces";
import { useToytags } from "@/hooks/use-vehicles";

export default function ToytagCard() {
  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <Tags size={16} />
          &nbsp; TOYTAGs
        </ThemedText>
      </ThemedView>

      <ToytagCardContent />
    </ThemedView>
  );
}

export function ToytagCardContent() {
  const { data, isLoading, error } = useToytags();

  if (error || data?.toytags.length === 0) {
    return (
      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        <ThemedText type="small">
          No TOYTAGs have been added to this account yet.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView type="backgroundElement" style={Styles.cardContent}>
      {data?.toytags.map((item: IToytag) => {
        return (
          <ThemedText key={item._id} type="small">
            {item.toytag_number + "\n"}
            Vehicle:{" "}
            {item.vehicles.length > 0
              ? item.vehicles[0].state + "-" + item.vehicles[0].plate_number
              : ""}
          </ThemedText>
        );
      })}
    </ThemedView>
  );
}
