import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableOpacity, Pressable, Text, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [text, onChangeText] = React.useState('E-mail');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.view} >

      <Image source={require('./assets/logoexpo.png')} style={styles.image}/>

      <Text style={styles.text}>
        Renove sua essência, relaxe sua alma
      </Text>

      <br/>
      <br/>

      <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('CadastroUsuario');
            }}
          >
          <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>
      <br/>
      
       <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('TenhoConta');
          }}
          >
        <Text style={styles.text}>Login</Text>
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
    button:{
      margin: 10,
      padding: 5,
      borderRadius: 30,
      marginBottom: 1,
      overflow: 'hidden',
      backgroundColor: '#ff99c8',
    },
    image:{
      width: 110,
      height: 120,
      marginBottom: 10,
      marginLeft: 90,
    },
    text: {
        color: "black",
        fontFamily: 'times',
        fontSize: 18,
        margin: 8,
        padding: 5,
        textAlign: 'center',
     
    },
});

export default Login;
