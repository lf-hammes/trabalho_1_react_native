import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function Footer() {
    const navigation = useNavigation ()
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate("Home")}}> 
                <Ionicons name="home" size={18} />

            </TouchableOpacity>
            <Ionicons name="search" size={18} />
            <Ionicons name="heart" size={18} />
            <Ionicons name="basket" size={18} />
        </View>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(57,68,87,1)",
        height: 80,
        alignItems: "center",
        justifyContent: "space-between",
      }
})