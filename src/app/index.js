import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const {signIn, SignOut} = useAuth();

return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo pronto para usar</Text>
      
      <Button 
      title='Singnin Super'
       onPress={()=>
       signIn({email:"super@email.com", password:"Super123!"})}
      
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
      
      
      <Button title='Singout' onPress={()=>SignOut()}/>
      <Button style="auto"/>
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
  },
  title: {
    fontFamily:"bold",
    fontSize:20,
  }
});
