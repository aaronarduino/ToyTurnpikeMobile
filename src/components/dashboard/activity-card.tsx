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

export default function ActivityCard() {
  const [data, setData] = useState({
    tolls: 0,
    fees: 0,
    payments: 0,
    adjustments: 0,
    refunds: 0,
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
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/dashboard/activity`,
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
