import { StyleSheet } from "react-native";

import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing, Styles } from "@/constants/theme";
import { List } from "lucide-react-native";
import { useDashboardActivity } from "@/hooks/use-dashboard";

export default function ActivityCard() {
  const { data, isLoading, error } = useDashboardActivity();

  if (error) {
    return <ThemedText type="code">{error}</ThemedText>;
  }

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <List size={16} />
          &nbsp; Activity (Last 30 Days)
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        <HintRow
          title="Tolls"
          hint={<ThemedText type="code">{data.tolls}</ThemedText>}
        />
        <HintRow
          title="Fees"
          hint={<ThemedText type="code">{data.fees}</ThemedText>}
        />
        <HintRow
          title="Payments"
          hint={<ThemedText type="code">{data.payments}</ThemedText>}
        />
        <HintRow
          title="Adjustments"
          hint={<ThemedText type="code">{data.adjustments}</ThemedText>}
        />
        <HintRow
          title="Refunds"
          hint={<ThemedText type="code">{data.refunds}</ThemedText>}
        />
      </ThemedView>
    </ThemedView>
  );
}
