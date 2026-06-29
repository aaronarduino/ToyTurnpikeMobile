import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useSession } from "@/ctx";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  const handleLogin = async () => {
    const authResult = await signIn(email, password);
    // TODO: Finish handling login here.
    // console.log(`error: ${authResult.error?.message}`);
    // console.log(`data: ${JSON.stringify(authResult.data)}`);
    if (authResult === true) {
      router.replace("/fun");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
