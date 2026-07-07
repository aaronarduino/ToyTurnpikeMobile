import { Button, StyleSheet } from "react-native";

import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing, Styles } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { CreditCard } from "lucide-react-native";
import { router } from "expo-router";
import { useDashboardPaymentMethods } from "@/hooks/use-dashboard";

export default function PaymentMethodsCard() {
  const { data, isLoading, error } = useDashboardPaymentMethods();
  const theme = useTheme();

  if (error) {
    return <ThemedText type="code">{error}</ThemedText>;
  }

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <CreditCard size={16} />
          &nbsp; Auto-Pay Methods
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        <HintRow
          title="Primary"
          hint={
            <ThemedText type="code">****{data.primary.card_number}</ThemedText>
          }
        />
        <HintRow
          title="Expiration Date"
          hint={
            <ThemedText type="code">{data.primary.expiration_date}</ThemedText>
          }
        />
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardBottomHeader}>
        <Button
          onPress={() => router.navigate("/main/payments")}
          title="View Auto-Pay Methods"
        />
      </ThemedView>
    </ThemedView>
  );
}
