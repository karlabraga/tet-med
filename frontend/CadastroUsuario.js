import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Pressable, Text } from 'react-native';

const CadastroUsuario = ({ navigation }) => {

  const [nome, setNome] = useState(''); //são constantes do tipo useState -> tá usando pra pegar os dados que foram digitados pelos usuarios, funciona como um objeto tendo metodo get e set
  const [email, setEmail] = useState(''); //[get, set] o get não precisa escrever get só o set que precisa
  const [senha, setSenha] = useState(''); //o construtor ('') inicializa sem nada
  const [data, setData] = useState('');

 const Cadastrar = () => {
    if(!nome || !email || !senha) {
      console.log("Erro");
      return;
    }
  
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('https://tet-karla.glitch.me/usuarios', {
      method: 'POST',
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
  }

  return (
      <View style={styles.view}>

      <Text style={styles.text}>
      Insira os seus dados nos campos abaixo
      </Text>

        <TextInput
            style={styles.button}
            onChangeText={(event) => setNome(event)}
            placeholder="Nome"
            keyboardType="text"
          
        />

        <TextInput
            style={styles.button}
            onChangeText={(event) => setSenha(event)}
            placeholder="Senha"
            keyboardType="numeric"
        />

        <TextInput
           style={styles.button}
            onChangeText={(event) => setEmail(event)}
            placeholder="E-mail"
            keyboardType="email"
            
        />
        <br/>
         
      <TouchableOpacity style={styles.cadastro}>
        <Text  onPress={Cadastrar}>
          Cadastrar{' '}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
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
      marginBottom: 1,
      overflow: 'hidden',
      backgroundColor: '#ff99c8',
      textAlign: 'center',
    },
    cadastro: {
      margin: 20,
      width: 80,
      borderRadius: 30,
      height: 40,
      backgroundColor: '#ff99c8',
      textAlign: 'center',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginLeft: 110,
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

export default CadastroUsuario;