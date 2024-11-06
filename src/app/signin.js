import { StatusBar } from 'expo-status-bar';
import { Alert, BackHandler, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", error.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao seu Aplicativo</Text>

      <View style={styles.inputBox}>
        <Ionicons name="person" size={20} color='#4169E1' />
        <TextInput
          placeholder='E-mail'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color='black' />
        <TextInput
          placeholder='Senha'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisibility}
          style={styles.input}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons name={passwordVisibility ? "eye-off-outline" : "eye-outline"} size={20} color='#4169E1' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEntrarSuper}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

      <TouchableOpacity style={styles.linkButton} onPress={() => router.push("/about")}>
        <Text style={styles.linkText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => BackHandler.exitApp()}>
        <Text style={styles.linkText}>Sair do Aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#4169E1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#4169E1',
    
    fontSize: 16,
    
  },
});
