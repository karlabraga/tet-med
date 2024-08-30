import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Sobre o item 1',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Sobre o item 2',
  },
  {
    id: '3',
    title: 'Item 3',
    description: 'Sobre o item 3',
  },
  {
    id: '4',
    title: 'Item 4',
    description: 'Sobre o item 4',
  },
];

const Item = ({id, title, description}) => (

  <View style={styles.item}>
    <Text style={styles.description}>{id}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <TouchableOpacity style={styles.button}>Entrar</TouchableOpacity>
  </View>

);

const renderItem = ({item}) => {

    return (
        <Item id={item.id} title={item.title} description={item.description} />
    )
}

const List = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA} //todos os dados da função lá de cima que chama data
        renderItem={renderItem} //como o intem vai aparecer na tela
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    fontSize: 20,
    
  }
});

export default List;