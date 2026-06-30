import * as Device from "expo-device";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
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
import { Car, Tags } from "lucide-react-native";
import { router } from "expo-router";
import { IToytag, IToytags } from "@/interfaces/api-interfaces";

export default function ToytagCard() {
  const [data, setData] = useState<IToytags | null>(null);
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
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/vehicles/toytags`,
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
          <Tags size={16} />
          &nbsp; TOYTAGs
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        {data?.toytags.map((item: IToytag) => {
          return (
            <ThemedText key={item._id} type="small">
              {item.toytag_number + "\n"}
              Vehicle:{" "}
              {item.vehicles.length > 0
                ? item.vehicles[0].state + "-" + item.vehicles[0].plate_number
                : ""}
            </ThemedText>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}
