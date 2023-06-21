import "react-native-gesture-handler";
import { Home } from "./src/pages/Home";
import { Login } from "./src/pages/Login";
import { DataProvider } from "./src/context/DataContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Editora } from "./src/pages/Editora";
import { Livro } from "./src/pages/Livro";

const Stack = createStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Editora" component={Editora}/>
          <Stack.Screen name="Livro" component={Livro} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
