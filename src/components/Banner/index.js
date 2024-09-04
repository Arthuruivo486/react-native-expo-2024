import { StyleSheet,Text,View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner(){

    const [page,setpage] = useState(0);

    const onPageSelected=(e )=> {
        setPage(e.nativeEvent.position);
    };
    return(
    
        <View style={styles.contaner}>
            <PagerView intinalPage={0} style={styles.content} 
            onPageSelected={onPageSelected}>
                <View key="1" style={styles.page}>
                    <Text style={styles.text}>Banner 1</Text>

                </View>
                <View key="2" style={styles.page}>
                    <Text style={styles.text}>Banner 2</Text>

                </View>
                <View key="3" style={styles.page}>
                    <Text style={styles.text}>Banner 3</Text>

                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
          
            
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    contaner:{
        flex:1,
    },
    content:{
        marginTop:10,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        width:"100%"
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#fff",
        padding:10,
    },
    bulletContent:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",

    },
    bullet:{
        width:10,
        height:10,
        borderRadius:5,
        margin:10,
        backgroundColor:"#999",
    },
    activeBullet:{
        backgroundColor:"#000"

    }
});