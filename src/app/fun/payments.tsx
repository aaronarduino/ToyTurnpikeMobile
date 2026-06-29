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

export default function Payments() {
  const [user, setUser] = useState({ account: { holder: "", id: -1 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { signOut } = useSession();
  const theme = useTheme();

  // 2. Use useEffect to run code on component load
  useEffect(() => {
    // Create an async function inside the effect
    const fetchDashboard = async () => {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };

      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          headers,
          // 'include' can interfere with the cookies we just set manually in the headers
          credentials: "omit",
        });

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
    <ScrollView
    // style={[styles.scrollView, { backgroundColor: theme.background }]}
    // contentInset={insets
    // contentContainerStyle={[styles.contentContainer]}
    >
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.heroSection}>
            <ThemedText type="title" style={styles.title}>
              Payments
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Welcome:"
              hint={<ThemedText type="code">{user.account.holder}</ThemedText>}
            />
            <HintRow
              title="Account ID:"
              hint={<ThemedText type="code">{user.account.id}</ThemedText>}
            />
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Welcome:"
              hint={<ThemedText type="code">{user.account.holder}</ThemedText>}
            />
            <HintRow
              title="Account ID:"
              hint={<ThemedText type="code">{user.account.id}</ThemedText>}
            />
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>

          <Button
            onPress={() => {
              // The guard in `RootNavigator` redirects back to the sign-in screen.
              signOut();
            }}
            title="Sign Out"
            // color="#841584"
            accessibilityLabel="Button to sign out of app."
          />

          {Platform.OS === "web" && <WebBadge />}
        </SafeAreaView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
