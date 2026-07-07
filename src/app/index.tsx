import { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useSession } from "@/ctx";
import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const { signIn } = useSession();

  const handleLogin = async () => {
    const authResult = await signIn(email, password);
    if (authResult.success === true) {
      router.replace("/main");
    } else {
      setValid(false);
      // TODO: This is not a good way of displaying an auth error to the user.
      //       Find another way to handle this.
      //Alert.alert("Error", authResult.error?.message);
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
      <TextInput
        placeholder="Email"
        style={{
          borderColor: valid
            ? Colors.light.borderColor
            : Colors.light.borderColorError,
          ...style.defaultInput,
        }}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={style.defaultInput}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
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
