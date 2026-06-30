import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

import { ExternalLink } from "@/components/external-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { WebBadge } from "@/components/web-badge";
import {
  BottomTabInset,
  ContentPlatformStyle,
  MaxContentWidth,
  Spacing,
  Styles,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import VehiclesCard from "@/components/vehicles/vehicles-card";
import ToytagCard from "@/components/vehicles/toytag-card";

export default function Vehicles() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  return (
    <ScrollView
      style={[Styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[Styles.contentContainer]}
    >
      <ThemedView style={Styles.container}>
        <SafeAreaView style={Styles.safeArea}>
          <ThemedView style={Styles.heroSection}>
            <ThemedText type="subtitle" style={Styles.title}>
              Vehicles & TOYTAGs
            </ThemedText>
          </ThemedView>

          <VehiclesCard />
          <ToytagCard />
          {/*<ThemedView style={Styles.mainContent}>
            <VehiclesCard />
            <ToytagCard />
          </ThemedView>*/}

          {Platform.OS === "web" && <WebBadge />}
        </SafeAreaView>
      </ThemedView>
    </ScrollView>
  );
}
