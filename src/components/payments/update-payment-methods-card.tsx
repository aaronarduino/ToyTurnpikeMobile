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
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
  Styles,
} from "@/constants/theme";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { formatter } from "@/constants/currency";
import { CreditCard } from "lucide-react-native";
import { router } from "expo-router";

export default function UpdatePaymentMethodsCard() {
  const [data, setData] = useState({
    primary: {
      card_number: 0,
      expiration_date: "",
    },
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
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/dashboard/payment_methods`,
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
      } catch (err: any) {
        // TODO: fix all the fetch catch error types
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
    </ThemedView>
  );
}
