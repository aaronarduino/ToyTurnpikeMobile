import { useState } from "react";
import { TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/ctx";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function Index() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { signIn } = useSession();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setServerError(null);
    const authResult = await signIn(data.email, data.password);
    if (authResult.success === true) {
      router.replace("/main");
    } else {
      setServerError(authResult.error?.message ?? "An error occurred");
    }
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: Spacing.two,
        paddingHorizontal: Spacing.three,
      }}
    >
      <ThemedText type="subtitle">Toy Turnpike Mobile</ThemedText>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                borderColor: errors.email ? theme.borderColorError : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.email && (
              <ThemedText style={{ color: theme.borderColorError, alignSelf: "flex-start" }}>
                {errors.email.message}
              </ThemedText>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              style={{
                borderColor: errors.password ? theme.borderColorError : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.password && (
              <ThemedText style={{ color: theme.borderColorError, alignSelf: "flex-start" }}>
                {errors.password.message}
              </ThemedText>
            )}
          </>
        )}
      />
      {serverError && (
        <ThemedText style={{ color: theme.borderColorError, alignSelf: "flex-start" }}>
          {serverError}
        </ThemedText>
      )}
      <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
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
