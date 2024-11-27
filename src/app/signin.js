import { StatusBar } from "expo-status-bar";
import { Alert, BackHandler, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/Auth";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'; // Importando o LinearGradient

export default function App() {
  const { signIn, signOut } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const tooglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['#8B0505', '#FF6262']} // Gradiente da parte escura para a parte clara
      style={styles.container}
    >
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputbox}> 
        <Ionicons name="mail-open-outline" size={20} color="#8B0505" />
        <TextInput
          style={styles.emailinput}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        /> 
      </View> 

      <View style={styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="#8B0505" />
        <TextInput
          style={styles.emailinput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisibility}
        />
        <Ionicons
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#8B0505"
          onPress={tooglePasswordVisibility}
        />
      </View>

      {/* Botão Entrar com ícone */}
      <TouchableOpacity onPress={handleEntrarSuper} style={styles.button}>
        <Ionicons name="log-in-outline" size={20} color="white" />
        <Text style={styles.textbutton}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão Sobre com ícone */}
      <TouchableOpacity onPress={() => router.push("about")} style={styles.button}>
        <Ionicons name="information-circle-outline" size={20} color="white" />
        <Text style={styles.textbutton}>Sobre</Text>
      </TouchableOpacity>

      {/* Botão Sair com ícone */}
      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.button}>
        <Ionicons name="exit-outline" size={20} color="white" />
        <Text style={styles.textbutton}>Sair</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 40,
    borderWidth: 4,
    borderRadius: 50,
    padding: 10,
  },
  inputbox: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emailinput: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 18,
    color: '#333',
    paddingLeft: 10,
  },
  button: {
    flexDirection: "row", // Para alinhar ícone e texto horizontalmente
    alignItems: "center", // Alinhar ícone e texto ao centro
    borderColor: 'white',
    borderWidth: 4,
    paddingLeft:76,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginVertical: 10,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  textbutton: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10, // Espaço entre o ícone e o texto
  },
});
