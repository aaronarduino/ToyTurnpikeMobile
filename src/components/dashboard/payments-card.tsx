import { StyleSheet } from "react-native";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { formatter } from "@/constants/currency";
import { useDashboardPayments } from "@/hooks/use-dashboard";

export default function PaymentsCard() {
  const { data, isLoading, error } = useDashboardPayments();
  const theme = useTheme();

  if (error) {
    return (
      <ThemedView type="backgroundElement" style={styles.stepContainer}>
        <HintRow
          title="Statement Balance"
          hint={<ThemedText type="code"></ThemedText>}
        />
        <HintRow
          title="Auto pay on"
          hint={<ThemedText type="code"></ThemedText>}
        />
        <HintRow
          title="Current Account Balance"
          hint={<ThemedText type="code"></ThemedText>}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView type="backgroundElement" style={styles.stepContainer}>
      <HintRow
        title="Statement Balance"
        hint={
          <ThemedText type="code">
            {formatter.format(data.statement_balance)}
          </ThemedText>
        }
      />
      <HintRow
        title="Auto pay on"
        hint={<ThemedText type="code">{data.auto_pay_date}</ThemedText>}
      />
      <HintRow
        title="Current Account Balance"
        hint={
          <ThemedText type="code">
            {formatter.format(data.current_account_balance)}
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
