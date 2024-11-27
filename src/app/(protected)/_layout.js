import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';
import { LinearGradient } from 'expo-linear-gradient'; // Importando o LinearGradient

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      {/* Aplicando gradiente no fundo da imagem do logo */}
      <LinearGradient 
        colors={['#8B0505', '#FF6262']} 
        style={{ marginTop: 0, justifyContent: 'center', alignItems: 'center', padding: 40 ,borderBottomLeftRadius:170,borderBottomRightRadius:170,}}
        

      >
        <Image source={require('../../assets/logo2.png')} style={{ width: 120, height: 120, borderRadius: 100 }} />
      </LinearGradient>
      <View>
        {/* Verifica se user e user.nome estão definidos */}
        {user?.user?.nome ? (
          <Text style={{ textAlign: 'center', fontSize: 35, fontFamily: '', color: '#fff', marginTop:-39, }}>
            {user.user.nome}
          </Text>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: '', color: '#8B0505', paddingTop: 30 }}>
            Usuário não identificado
          </Text>
        )}
      </View>
      

      

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Aplicando gradiente no botão de sair */}
      <LinearGradient 
        colors={['#8B0505', '#FF6262']} 
        style={styles.desligar}
      >
        <TouchableOpacity onPress={async () => {
          try {
            await signOut();
          } catch (error) {
            console.error('Erro ao sair', error);
          }
        }}>
          <Text style={{ fontSize: 20, fontFamily: 'bold', color: '#fff' ,}}>Sair</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const DrawerLayout = () => (
  <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#8B0505' }}>
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* Exibindo apenas o botão Início e ocultando os outros */}
      <Drawer.Screen 
        name="index" 
        options={{ 
          drawerLabel: "Início", 
          headerTitle: "Início", 
          drawerIcon: () => <Ionicons name="home" size={30} color="#FF6262" /> 
        }} 
      />
      <Drawer.Screen 
        name="cadastroPizza" 
        options={{ 
          drawerLabel: "Cadastro Pizza", 
          headerTitle: "Cadastro de Pizza", 
          drawerIcon: () => <Ionicons name="pizza" size={30} color="#FF6262" /> 
        }} 
      />
      <Drawer.Screen 
        name="list" 
        options={{ 
          drawerLabel: "listagen", 
          headerTitle: "Lisatgen", 
          drawerIcon: () => <Ionicons name="nutrition" size={30} color="transparent" />, 
          drawerItemStyle: { display: 'none' } // Ocultando o item de listagem
        }} 
      />
      <Drawer.Screen 
        name="payment" 
        options={{ 
          drawerLabel: "Pagamentos", 
          headerTitle: "Pagamentos", 
          drawerIcon: () => <Ionicons name="cash-outline" size={30} color="transparent" />, 
          drawerItemStyle: { display: 'none' } // Ocultando o item de pagamentos
        }} 
      />
      <Drawer.Screen 
        name="details" 
        options={{
          headerTitle: "Detalhes",
          unmountOnBlur: true,
          drawerItemStyle: { display: 'none' }, // Ocultando o item de detalhes
        }} 
      />
    </Drawer>
  </GestureHandlerRootView>
);

export default DrawerLayout;

const styles = StyleSheet.create({
  desligar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius:10,
  },
  
});
