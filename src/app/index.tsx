import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useSession } from "@/ctx";
import { ThemedText } from "@/components/themed-text";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  const handleLogin = async () => {
    const authResult = await signIn(email, password);
    if (authResult.success === true) {
      router.replace("/main");
    } else {
      // TODO: This is not a good way of displaying an auth error to the user.
      //       Find another way to handle this.
      //Alert.alert("Error", authResult.error?.message);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText type="subtitle">Toy Turnpike Mobile</ThemedText>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
