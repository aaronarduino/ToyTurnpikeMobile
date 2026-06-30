import { authClient } from "@/lib/auth-client";
import { Button } from "react-native";
import { User } from "lucide-react-native";

import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Styles } from "@/constants/theme";
import { lastEightOf } from "@/lib/utils";
import { router } from "expo-router";

export default function UpdateAccountCard() {
  const { data: session } = authClient.useSession();

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
      <ThemedView type="backgroundElement" style={Styles.cardTopHeader}>
        <ThemedText type="smallTitle" style={Styles.cardTopHeaderText}>
          <User size={16} />
          &nbsp; Account ID {lastEightOf(session?.user.id as string)}
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        <HintRow
          title="Account Holder"
          hint={<ThemedText type="code">{session?.user.name}</ThemedText>}
        />
        <HintRow
          title="Account Email"
          hint={<ThemedText type="code">{session?.user.email}</ThemedText>}
        />
      </ThemedView>
    </ThemedView>
  );
}
