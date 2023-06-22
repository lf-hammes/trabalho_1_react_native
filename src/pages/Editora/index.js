import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../../global/Header";

export function Editora({ route }) {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editora, setEditora] = useState(null);
  const idEditora = route.params?.idEditora;

  async function getLivros() {
    try {
      const newEditora = await AxiosInstance.get(`/editoras/${idEditora}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setEditora(newEditora.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLivros();
    console.log(idEditora);
  }, []);

  return (
    
      <ScrollView>
      <View style={styles.container}>
      <StatusBar />
        <Header />
        {editora != null ? (
          editora.listaLivrosDTO.map((livro) => {
            console.log(livro);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Livro", { idLivro: livro.codigoLivro });
                }}
              >
                <Image
                  source={{ uri: `data:image/png;base64,${livro.imagem}` }}
                  style={styles.livro}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
    alignItems: "center",
    minHeight: 700,
  },
  livro: {
    margin: 10,
    width: 198,
    height: 300,
  },
});
