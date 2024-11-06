import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/Auth/index';

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Image source={require('../../assets/arthur.jpg')} style={{ width: 120, height: 120, borderRadius: 100, margin: 40 }} />
      </View>

      <View>
        {user && user.user && user.user.nome ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              backgroundColor: "#4169E1",
              color: "#fff",
              alignSelf: 'center',
              padding: 10,
              borderRadius: 15,
              overflow: 'hidden',
            }}
          >
            {user.user.nome}
          </Text>
        ) : (
          <Text style={{ textAlign: 'center', fontSize: 14, color: "#fff" }}>Usuário não identificado</Text>
        )}
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity onPress={() => signOut()} style={styles.desligar}>
        <Text style={{ fontSize: 20, fontFamily: 'bold', color: '#ffff' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#4169E1' }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: "inicio", headerTitle: "Principal", drawerIcon: () => <Ionicons name="home" size={20} color="#4169E1" /> }}
        />
        <Drawer.Screen
          name="list"
          options={{ drawerLabel: "Listagem", headerTitle: "Listagem", drawerIcon: () => <Ionicons name="list" size={20} color="#4169E1" /> }}
        />
        <Drawer.Screen
          name="payment"
          options={{ drawerLabel: "Pagamentos", headerTitle: "Pagamentos", drawerIcon: () => <Ionicons name="diamond-outline" size={20} color="#4169E1" /> }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return DrawerLayout();
}

const styles = StyleSheet.create({
  desligar: {
    height: 50,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
