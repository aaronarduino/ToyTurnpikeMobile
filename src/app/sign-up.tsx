import { useState } from "react";
import { TextInput, Button, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/ctx";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { signUp } = useSession();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    setServerError(null);
    const authResult = await signUp(data.email, data.password, data.name);
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
      <ThemedText type="subtitle">Create Account</ThemedText>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="words"
              style={{
                borderColor: errors.name
                  ? theme.borderColorError
                  : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.name && (
              <ThemedText
                style={{
                  color: theme.borderColorError,
                  alignSelf: "flex-start",
                }}
              >
                {errors.name.message}
              </ThemedText>
            )}
          </>
        )}
      />
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
                borderColor: errors.email
                  ? theme.borderColorError
                  : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.email && (
              <ThemedText
                style={{
                  color: theme.borderColorError,
                  alignSelf: "flex-start",
                }}
              >
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
                borderColor: errors.password
                  ? theme.borderColorError
                  : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.password && (
              <ThemedText
                style={{
                  color: theme.borderColorError,
                  alignSelf: "flex-start",
                }}
              >
                {errors.password.message}
              </ThemedText>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              style={{
                borderColor: errors.confirmPassword
                  ? theme.borderColorError
                  : theme.borderColor,
                color: theme.text,
                ...style.defaultInput,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.confirmPassword && (
              <ThemedText
                style={{
                  color: theme.borderColorError,
                  alignSelf: "flex-start",
                }}
              >
                {errors.confirmPassword.message}
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
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
      <Pressable
        onPress={() => router.replace("/")}
        style={{ flex: 0, flexDirection: "row" }}
      >
        <ThemedText type="link">Already have an account?&nbsp;</ThemedText>
        <ThemedText type="linkPrimary">Sign in</ThemedText>
      </Pressable>
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
