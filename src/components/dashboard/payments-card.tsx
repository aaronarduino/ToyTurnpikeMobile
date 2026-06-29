import * as Device from "expo-device";
import { authClient } from "@/lib/auth-client";
import { Button, Platform, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { useSession } from "@/ctx";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { formatter } from "@/constants/currency";

export default function PaymentsCard() {
  const [data, setData] = useState({
    statement_balance: 0.0,
    auto_pay_date: "",
    current_account_balance: 0.0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  // 2. Use useEffect to run code on component load
  useEffect(() => {
    // Create an async function inside the effect
    const fetchAccountInfo = async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };

      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/dashboard/payments`,
          {
            headers,
            // 'include' can interfere with the cookies we just set manually in the headers
            credentials: "omit",
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataResult = await response.json();
        setData(dataResult); // Store data in state
      } catch (err) {
        setError(err.message); // Store error in state
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };

    fetchAccountInfo();
  }, []);

  if (error) {
    return <ThemedText type="code">{error}</ThemedText>;
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
