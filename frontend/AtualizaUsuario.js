import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Pressable, Text } from 'react-native';

const AtualizaUsuario = ({ navigation, route }) =>  {

  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function fetchItem() {
      fetch('http://localhost:3000/cuidador/' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
          setNome(resJson[0].Nome);
          setEmail(resJson[0].Email);
        })
        .catch((e) => console.log(e));
    }
    fetchItem();
  }, []);

  const Atualizar = () => {
    console.log('Usuário atualizado');
    if (!nome || !email || !senha) {
      console.log('Campos Vazios');
      return;
    }
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('http://localhost:3000/atualiza/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Deletar = () => {
    console.log('Usuário deletado');

    if (!nome || !email || !senha) {
      console.log('Campos Vazios');
      return;
    }
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('http://localhost:3000/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView  style={styles.view}>

        <Text style={styles.text}>
        Insira os dados do usuario que você deseja atualizar ou deletar
        </Text>

          <TextInput
              style={styles.button}
              onChangeText={(event) => setNome(event)}
              placeholder="Nome"
              value={nome}
              keyboardType="text"
          />

          <TextInput
              style={styles.button}
              onChangeText={(event) => setSenha(event)}
              placeholder="Senha"
              value={senha}
              keyboardType="numeric"
          />

          <TextInput
              style={styles.button}
              onChangeText={(event) => setEmail(event)}
              placeholder="E-mail"
              value={email}
              keyboardType="Email"
          />

        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={Atualizar}>
            <Text style={styles.cadastro}>Atualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={Deletar}>
            <Text style={styles.cadastro}>Deletar</Text>
          </TouchableOpacity>
      </SafeAreaView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',       
    justifyContent: 'center',     
    alignItems: 'center',
    marginTop: 10,            
  },
  cadastro: {
    color: 'black',
    padding: 3,
    borderRadius: 5,
  },
  view:{
    justifyContent: 'center',
    alingItems: "center",
    padding: 20,
    backgroundColor: "#f5ebe0",
    flex: 1,
  },
  button: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    marginBottom: 3,
    backgroundColor: '#ff99c8',
    textAlign: 'center',
  },
  text: {
    color: "black",
    fontFamily: 'times',
    fontSize: 18,
    margin: 8,
    padding: 5,
    textAlign:'center',
     
    },
   
});

export default AtualizaUsuario;