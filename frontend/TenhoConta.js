import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Pressable, Text, Button } from 'react-native';

const TenhoConta = ({ navigation }) => {
  const [email, setEmail] = useState(''); //[get, set] o get não precisa escrever get só o set que precisa
  const [senha, setSenha] = useState(''); //o construtor ('') inicializa sem nada   

const verificarLogin = ()=>{
   console.log("Verificando Login")
   var userObj = {email: email, senha: senha }; 
   var jsonBody = JSON.stringify(userObj);

  fetch('https://tet-karla.glitch.me/login', { //fazedno requisição para a rota do glitch
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
      },
      body: jsonBody, //passando body que foi criado na linha 13

        })
      .then(response => response.json()) // a resposta responde em um json e dá uma resposta no log
      .then(json => {
          console.log(json);
          if(json.mensagem=='Usuário válido'){
          navigation.navigate('AtualizaUsuario', {id:json.id});

          }
          
      })
      .catch((err) => {
          console.log(err);
      
      });
 }

  return (
      <View style={styles.view} >

      <Text style={styles.text}>
        Faça o seu login
      </Text>
        
        <TextInput
            style={styles.button}
            onChangeText={(event) => setEmail(event)}
            placeholder="E-mail"
            keyboardType="email"
        />

        <TextInput
            style={styles.button}
            onChangeText={(event) => setSenha(event)}
            placeholder="Senha"
            keyboardType="numeric"
        />
    

      <TouchableOpacity>
        <Text style={styles.cadastro} onPress={verificarLogin}>
          Finalizar{' '}
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


export default TenhoConta;