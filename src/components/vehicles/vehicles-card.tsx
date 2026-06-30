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
import { Car } from "lucide-react-native";
import { router } from "expo-router";

export default function VehiclesCard() {
  const [data, setData] = useState({
    vehicles: 0,
    toytags: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

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
          `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/dashboard/vehicles_toytags`,
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
          <Car size={16} />
          &nbsp; Vehicles
        </ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={Styles.cardContent}>
        {DATA.map((item) => {
          return (
            <ThemedText key={item.id} type="small">
              {item.title}
            </ThemedText>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}
