import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer,DrawerContentScrollView,DrawerItemList } from 'expo-router/drawer';
import { Text, View,Button, TouchableOpacity, Image } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { useAuth } from '../../hooks/Auth/index';

function CustomDrawerContent(props) {

  const {signOut,user} = useAuth();

 

    return (
    <View style ={{flex: 1}}>
      <View style={{
          marginTop:20,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#f0f0f0",
          paddingVertical:10,

      }}>
        

        <Image source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}/>
        <Text style={{textAlign:"center",fontSize:20, margin:14, fontFamily:"regular"}}> 
          {user?.user?.nome}

        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <TouchableOpacity  onPress={()=>signOut()}
        style={{
          width: "100%",
          justifyContent:"center",
          alingItems:"center",
          height: 50,
          margin:10,
          backgroundColor:"#0000ff",
          borderRadius:5,
        }}

          
          >
          <Text style={{color:"white",fontFamily:"bold" }}>Deslogar</Text>
        </TouchableOpacity>
    
      </DrawerContentScrollView>
    </View>
  );
}

const DrawerLayout = () =>{
    
        return (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent{...props}/>}>

              <Drawer.Screen name="index" 
              options={{
                drawerLabel:"Principal",
                headerTitle:"Pricipal", 
                drawerIcon:()=><Ionicons name="home-outline" size={20} color="black"/>,}}
              />
              <Drawer.Screen name="list" 
              options={{
                drawerLabel:"Listagen",
                headerTitle:"Listagen",
                drawerIcon:()=><Ionicons name="list-outline" size={20} color="black"/>,}}
              />
              <Drawer.Screen name="payments" 
              options={{
                drawerLabel:"Pagamentos",
                headerTitle:"Pagamentos",
                drawerIcon:()=><Ionicons name="diamond-outline" size={20} color="black"/>,}}
              />

            </Drawer>
          </GestureHandlerRootView>
        );
}


export default function Layout() {
  return DrawerLayout();
}