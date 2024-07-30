import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CadastroUsuario from './CadastroUsuario'; //sem default no CadastroUsuario tem que colocar as chaves
import AtualizaUsuario from './AtualizaUsuario';
import TenhoConta from './TenhoConta';
import Login from './Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="TenhoConta" component={TenhoConta} />
        <Stack.Screen name="AtualizaUsuario" component={AtualizaUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
