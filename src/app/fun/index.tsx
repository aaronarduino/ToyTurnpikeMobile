import * as Device from "expo-device";
import { authClient } from "@/lib/auth-client";
import { Platform, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { useSession } from "@/ctx";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useEffect, useState } from "react";
import PaymentsCard from "@/components/dashboard/payments-card";
import AccountCard from "@/components/dashboard/account-card";
import PaymentMethodsCard from "@/components/dashboard/payment-methods-card";
import VehiclesToytagsCard from "@/components/dashboard/vehicles-toytags-card";
import ActivityCard from "@/components/dashboard/activity-card";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [user, setUser] = useState({ account: { holder: "", id: -1 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { signOut } = useSession();
  const { data: session } = authClient.useSession();

  // 2. Use useEffect to run code on component load
  useEffect(() => {
    // Create an async function inside the effect
    const fetchDashboard = async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };

      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/dashboard`,
          {
            headers,
            // 'include' can interfere with the cookies we just set manually in the headers
            credentials: "omit",
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data); // Store data in state
      } catch (err) {
        setError(err.message); // Store error in state
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };

    fetchDashboard();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Welcome
            {session?.user.name != undefined && session?.user.name != ""
              ? ","
              : ""}
            &nbsp;
            {session?.user.name}
          </ThemedText>
        </ThemedView>

        <ThemedText
          type="code"
          style={{
            alignSelf: "center",
            paddingBottom: Spacing.six,
            ...styles.code,
          }}
        >
          Account ID: {session?.user.id}
        </ThemedText>

        <ScrollView
          style={{ margin: 0, padding: 0 }}
          contentContainerStyle={styles.cards}
        >
          <PaymentsCard />
          <AccountCard />
          <PaymentMethodsCard />
          <VehiclesToytagsCard />
          <ActivityCard />
        </ScrollView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  cards: {
    flexDirection: "column",
    gap: Spacing.three,
    padding: 0,
    margin: 0,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.three,
    gap: Spacing.one,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
