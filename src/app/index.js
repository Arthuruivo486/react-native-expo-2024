import { StatusBar } from 'expo-status-bar';
import { BackHandler, Button, StyleSheet, Text, View } from 'react-native';
import {useAuth} from "../hooks/Auth";
import { router } from 'expo-router';



export default function App() {
  const {signIn, SignOut} = useAuth();

  const handleEntrarSuper = async() =>{
    try{
      await singIn({email:"super@gamail.com", password:"Super123!"})
      router.replace("/")

    }catch (error){
      console.log(e)
    }
  }

return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo pronto para usar</Text>
      
      <Button 
      title='Singnin Super'
       onPress={handleEntrarSuper}
      />
      <Button 
      title='Singnin Adm'
       onPress={()=>
       signIn({email:"adm@email.com", password:"Adm123!"})}
      
      />
      <Button 
      title='Singnin User'
       onPress={()=>
       signIn({email:"user@email.com", password:"User123!"})}
      
      />
      
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
  }
});
