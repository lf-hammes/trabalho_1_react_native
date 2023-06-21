import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  FlatList,
  Touchable,
} from "react-native";
import { ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const [editoras, setEditoras] = useState([]);
  const [livros, setLivros] = useState([]);

  const Editora = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Editora", { idEditora: item.codigoEditora });
      }}
    >
      <View style={styles.itemEditora}>
        <Image
          style={styles.editora}
          source={{ uri: `data:image/png;base64,${item.img}` }}
        />
      </View>
    </TouchableOpacity>
  );

  const Livro = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Livro", { idLivro: item.codigoLivro });
      }}
    >
      <View style={styles.itemLivro}>
        <Image
          style={styles.livro}
          source={{ uri: `data:image/png;base64,${item.img}` }}
        />
      </View>
    </TouchableOpacity>
  );

  async function getEditoras() {
    await AxiosInstance.get("/editoras", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setEditoras(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getLivros() {
    await AxiosInstance.get("/livros", {
      headers: {
        Authorization: `Bearer ${dadosUsuario?.token}`,
      },
    })
      .then((response) => {
        setLivros(aleatorio(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getEditoras();
    getLivros();
  }, []);

  function aleatorio(array) {
    let i = array.length;
    let j = 0;
    let newArray = array;

    while (i != 0) {
      j = Math.floor(Math.random() * i);
      i--;
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    let final = newArray.splice(0, 10);
    return final;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar />
        <View>
          <FlatList
            data={editoras}
            renderItem={({ item }) => <Editora item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.title}>Alguns livros</Text>
        <View>
          <FlatList
            data={livros}
            renderItem={({ item }) => <Livro item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.title}>Destaques</Text>
        <View>
          <View style={styles.itemDestaque}>
            <Image
              style={styles.destaque}
              source={{
                uri: "https://about.proquest.com/globalassets/proquest/media/images/decrotive/oldbooks.jpg",
              }}
            />
            <Text style={styles.titleItem}>Destaque 1</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(57,68,87,1)",
  },
  itemEditora: {
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  editora: {
    width: 100,
    height: 100,
  },
  itemLivro: {
    width: 170,
    height: 260,
    marginVertical: 20,
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  livro: {
    width: 165,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10,
  },
  itemDestaque: {
    width: "80%",
    height: 300,
    backgroundColor: "black",
    marginHorizontal: "10%",
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  destaque: {
    width: "100%",
    height: 200,
  },
  titleItem: {
    fontSize: 15,
    color: "white",
  },
});
