import { Button, Text, View, Image, StyleSheet } from "react-native";
import { useAuth } from "../../hooks/Auth";
import { Banner } from "../../components/Banner";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Imagem acima do banner */}
      <Image source={require("../../assets/nome.png")} style={styles.image} />
      
      {/* Banner abaixo da imagem */}
      <Banner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Alinha os itens verticalmente no centro
    alignItems: "center", // Alinha os itens horizontalmente no centro
  },
  image: {
    width: 300, // Defina o tamanho da imagem
    height: 300, // Defina o tamanho da imagem
     // Espaçamento entre a imagem e o bannermargi
     marginTop:-200,
     marginLeft:43,
     
  },
});
