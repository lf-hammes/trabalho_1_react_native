import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState, useContext } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { Header } from "../../../global/Header";

export function Livro({route}) {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [livro, setLivro] = useState(null);
  const idLivro = route.params?.idLivro;
}

  async function getLivros() {
    try {
      const newLivro = await AxiosInstance.get(`/livros/${idLivros}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      setLivro(newLivro.data);
    } catch (error) {
      console.log(error);
    }
    useEffect(() => {
      getLivros();
      console.log(idEditora);
    }, []);
    }

  return (
    <ScrollView>
      <StatusBar />
      <View style={styles.container}>
        <Header />  

        <Image
                  source={{ uri: `data:image/png;base64,${livro.imagem}` }}
                  style={styles.livro}
                />
                 <Text>Livro</Text> 
                 <TextTrackList Nome do livro></TextTrackList>
                 <TextTrackList Editora></TextTrackList>
  
      
        </View>
    </ScrollView>
  );
  
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
  },
});
