import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
  const [page, setPage] = useState(0);

  const onPageSelected = (e) => {
    setPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView initialPage={0} style={styles.content} onPageSelected={onPageSelected}>
        {/* Promoções - Banner 1 */}
        <View key="1" style={styles.page}>
          <Text style={styles.promotionTitle}>Promoção 1</Text>
          <Text style={styles.promotionText}>Pizza de Calabresa por apenas R$29,90!</Text>
        </View>
        {/* Promoções - Banner 2 */}
        <View key="2" style={styles.page}>
          <Text style={styles.promotionTitle}>Promoção 2</Text>
          <Text style={styles.promotionText}>Combo Família (2 Pizzas + 1 Refrigerante) por R$59,90!</Text>
        </View>
        {/* Promoções - Banner 3 */}
        <View key="3" style={styles.page}>
          <Text style={styles.promotionTitle}>Promoção 3</Text>
          <Text style={styles.promotionText}>Desconto de 10% em pedidos acima de R$50!</Text>
        </View>
      </PagerView>

      {/* Indicadores de página */}
      <View style={styles.bulletContent}>
        <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
        <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
        <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: -40,
    alignItems: 'center', // Para centralizar os itens
  },
  content: {
    height: 200, // Aumentei a altura para dar mais destaque
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 15, // Bordas mais arredondadas
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000", // Sombra para dar destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Para Android, torna a sombra visível
  },
  promotionTitle: {
    fontSize: 26, // Tamanho de fonte maior
    fontWeight: 'bold',
    color: '#FF6262',
    marginBottom: 10,
    fontFamily: 'regular', // Definindo a fonte
  },
  promotionText: {
    fontSize: 18, // Aumentei o tamanho da fonte do texto
    color: '#333',
    textAlign: 'center',
    fontFamily: 'regular',
  },
  bulletContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15, // Espaço maior entre as bolinhas
  },
  bullet: {
    width: 12, // Aumentei o tamanho das bolinhas
    height: 12,
    borderRadius: 6,
    backgroundColor: '#999',
    margin: 5,
  },
  activeBullet: {
    backgroundColor: '#FF6262', // cor ativa para o bullet
  },
});
