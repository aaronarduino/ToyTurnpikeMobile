import * as Device from "expo-device";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "lucide-react-native";
import { ExternalLink } from "@/components/external-link";

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
import { lastEightOf } from "@/lib/utils";
import { router } from "expo-router";

export default function AccountCard() {
  const { data: session } = authClient.useSession();
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedView
        type="backgroundElement"
        style={{ borderBottomWidth: 1, borderBottomColor: "#c4c4d1" }}
      >
        <ThemedText
          type="default"
          style={{
            alignSelf: "center",
            paddingBottom: 16,
          }}
        >
          <User size={16} />
          &nbsp; Account ID {lastEightOf(session?.user.id as string)}
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.cardContent}>
        <HintRow
          title="Account Holder"
          hint={<ThemedText type="code">{session?.user.name}</ThemedText>}
        />
      </ThemedView>

      <ThemedView
        type="backgroundElement"
        style={{ borderTopWidth: 1, borderTopColor: "#c4c4d1", paddingTop: 16 }}
      >
        <Button
          onPress={() => router.navigate("/fun/account")}
          title="View Account Details"
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  cardContent: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
