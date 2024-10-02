import { router } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useData } from "../hooks/Data";

export default function About() {
    const { data } = useData();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre</Text>
            <Text style={styles.description}>
                Aqui você pode adicionar informações sobre o aplicativo, sua finalidade e qualquer outro detalhe relevante.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5F5F5', // Fundo suave
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4169E1', // Cor do título
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#333', // Cor do texto
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4169E1',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
