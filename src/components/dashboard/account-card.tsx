import { authClient } from "@/lib/auth-client";
import { Button } from "react-native";
import { User } from "lucide-react-native";

import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Styles } from "@/constants/theme";
import { lastEightOf } from "@/lib/utils";
import { router } from "expo-router";

export default function AccountCard() {
  const { data: session } = authClient.useSession();

  return (
    <ThemedView type="backgroundElement" style={Styles.card}>
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

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
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
