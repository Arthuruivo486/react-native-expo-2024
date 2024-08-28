import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import {useAuth} from "../hooks/Auth";
import { router } from "expo-router";
import {Ionicons} from "@expo/vector-icons"
import { useState } from 'react';




export default function App() {
  const {singIn, SignOut} = useAuth();
  const [email,setEmail] = useState("super@gmail.com");
  const [password, setPassowd] = useState("A123456a!");
  const [passwordVisivility, setPassowdVisibiity] = useState(false);
  
  const tooglePasswordVisibility = () =>{
    setPassowdVisibiity(!passwordVisivility);
  };

  const handleEntrarSuper = async() =>{
    try{
      await singIn({email, password})
      router.replace("/")

    }catch (error){
      alert.alert("Erro",error.message);
      console.log(error)
    }
  };

return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo pronto para usar</Text>
      
      <View style = {styles.inputbox}>
        <Ionicons name="email-open-outline" size={20} color="black"/>
        <TextInput
         style={styles.emailinput}
          placebroder="E-mail" 
          vaule={email} 
          onChangeText={setEmail}/>
      </View>
      <View style = {styles.inputbox}>
        <Ionicons name="lock-closed-outline" size={20} color="black"/>
        <TextInput
         style={styles.emailinput}
          placebroder="Senha" 
          vaule={password} 
          onChangeText={setPassowd}/>
          secureTextEntry={passwordVisivility}

          <Ionicons 
          name={passwordVisivility? "eye-off-outline ": "eye-outline"} 
          size={20} 
          color="black" 
          onPress={tooglePasswordVisibility}/>
      </View>

      <Button style={styles.button} title="Entrar"onPress={handleEntrarSuper}/>
     
    
      <Button title ="sobre " onPress={()=>router.push("/about")}/>
      <Button title="Sair do aplicativo"
       onPress={()=>BackHandler.exitApp()}
       
       />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:15,
  },
  title: {
    fontFamily:"bold",
    fontSize:20,
  },
  inputbox:{
    flexDirection:"row",
    gap:10,
    marginVertical:10,
    alignItems:"center"
  },
  emailinput:{
    flex:1,
    fontFamily:"regular",
    fontSize:20,
  },
  button:{
    width:"100%"
  }
});
