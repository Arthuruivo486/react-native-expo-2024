import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const FontContext = createContext({})

export function FontProvider({ children }) {

    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
        balck: require("../../assets/fonts/Montserrat-Black.ttf"),
        semibold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        light: require("../../assets/fonts/Montserrat-Light.ttf"),
        italic: require("../../assets/fonts/Montserrat-Italic.ttf"),
       
    });

    if (!loaded && !error) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, marginTop: 15}}>CARREGANDO..</Text>
                <ActivityIndicator size={30} color="#202020" />
            </View>
        );
    }

    return <FontContext.Provider value={{loaded}}>{children}</FontContext.Provider>;


    return (
        <FontContext.Provider value={{}}>
            {children}
        </FontContext.Provider>
    );
}

export function useFont() {
    const context = useContext(FontContext)
    if (!context) {
        throw new Error('useFont must be used within a FontProvider')
    }
    return context;
}