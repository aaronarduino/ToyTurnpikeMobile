import { useState } from "react";
import {
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehiclesRepository } from "@/lib/repositories/vehicles-repository";
import { authClient } from "@/lib/auth-client";

const addVehicleSchema = z.object({
  plate_number: z.string().min(1, "Plate number is required"),
  state: z.string().min(1, "State is required"),
});

type AddVehicleForm = z.infer<typeof addVehicleSchema>;

export default function AddVehicle() {
  const [serverError, setServerError] = useState<string | null>(null);
  const theme = useTheme();
  const { data: session } = authClient.useSession();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddVehicleForm>({
    resolver: zodResolver(addVehicleSchema),
    defaultValues: {
      plate_number: "",
      state: "",
    },
  });

  const onSubmit = async (data: AddVehicleForm) => {
    setServerError(null);
    try {
      await vehiclesRepository.createVehicle({
        plate_number: data.plate_number,
        state: data.state,
        account_id: session?.user.id ?? "",
      });
      router.back();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Failed to add vehicle",
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ThemedView style={styles.form}>
          <Controller
            control={control}
            name="plate_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="Plate Number"
                  placeholderTextColor={theme.textSecondary}
                  autoCapitalize="characters"
                  style={{
                    borderColor: errors.plate_number
                      ? theme.borderColorError
                      : theme.borderColor,
                    color: theme.text,
                    ...style.defaultInput,
                  }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.plate_number && (
                  <ThemedText
                    style={{
                      color: theme.borderColorError,
                      alignSelf: "flex-start",
                    }}
                  >
                    {errors.plate_number.message}
                  </ThemedText>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="State (e.g. CA)"
                  placeholderTextColor={theme.textSecondary}
                  autoCapitalize="characters"
                  style={{
                    borderColor: errors.state
                      ? theme.borderColorError
                      : theme.borderColor,
                    color: theme.text,
                    ...style.defaultInput,
                  }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {errors.state && (
                  <ThemedText
                    style={{
                      color: theme.borderColorError,
                      alignSelf: "flex-start",
                    }}
                  >
                    {errors.state.message}
                  </ThemedText>
                )}
              </>
            )}
          />
          {serverError && (
            <ThemedText
              style={{ color: theme.borderColorError, alignSelf: "flex-start" }}
            >
              {serverError}
            </ThemedText>
          )}
          <Button
            title="Add Vehicle"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const style = StyleSheet.create({
  defaultInput: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    width: "100%",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    gap: Spacing.two,
  },
});
