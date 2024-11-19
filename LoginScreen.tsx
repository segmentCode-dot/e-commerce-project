import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import axios from "axios";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      // Store token locally in your app
      navigation.navigate("Products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <textField
        hint="Email"
        keyboardType="email"
        text={email}
        onTextChange={(e) => setEmail(e.value)}
        style={styles.input}
      />
      <textField
        hint="Password"
        secure={true}
        text={password}
        onTextChange={(e) => setPassword(e.value)}
        style={styles.input}
      />
      <button text="Login" onTap={handleLogin} style={styles.button} />
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "80%",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    color: "#fff",
    borderRadius: 5,
  },
});