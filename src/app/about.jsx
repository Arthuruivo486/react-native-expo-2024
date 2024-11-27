import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require('../assets/sobre.png')} // Substitua pelo caminho da sua imagem
      style={styles.container}
      resizeMode="cover"
    >
      {/* Máscara de sobreposição para clarear a imagem */}
      <View style={styles.overlay}></View>

      <Text style={styles.title}>Sobre o Dony Pizza</Text>

      <Text style={styles.description}>
        Olá! Este aplicativo foi desenvolvido por <Text style={styles.bold}>Arthur Ruivo</Text> para proporcionar a melhor
        experiência de pedidos de pizza. No <Text style={styles.bold}>Dony Pizza</Text>, você pode personalizar suas pizzas,
        explorar promoções incríveis e fazer pedidos com facilidade.
      </Text>

      <Text style={styles.footer}>
        Aplicativo desenvolvido para facilitar seu pedido e trazer mais sabor à sua vida!
      </Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Máscara semitransparente branca
    borderRadius: 20, // Mantém a borda arredondada
  },
  title: {
    fontSize: 36,
    color: '#8B0505',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: '', // Troque a fonte se necessário
  },
  description: {
    fontSize: 18,
    color: '#8B0505',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: '',
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 16,
    color: '#8B0505',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontFamily: '',
  },
  button: {
    backgroundColor: '#8B0505',  // Cor do botão mais escura
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
