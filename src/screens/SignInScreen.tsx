import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { MyTextInput } from '../components/MyTextInput';
import { styles } from './styles';
import { MyButton } from '../components/MyButton';
import logo from '../../src/assets/logo.png';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SignInScreenNavigationProp } from '../routes/Router';

export function SignInScreen() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigation = useNavigation<SignInScreenNavigationProp>();

  useEffect(() => {
    // Limpa os campos ao montar a tela
    setUserMail('');
    setUserPass('');
  }, []); // O array vazio faz com que isso ocorra apenas na montagem da tela

  function userLogin() {
    auth()
      .signInWithEmailAndPassword(userMail, userPass)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        alert('Login inválido! Tente novamente.');
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image 
        style={{ 
          width: 200,
          height: 200,
          marginBottom: 10 
        }}
        resizeMode='contain'
        source={logo}
      />
  
      <MyTextInput
        placeholder='E-mail'
        value={userMail}
        onChangeText={setUserMail}
      />
      <MyTextInput 
        secureTextEntry
        placeholder='Senha'
        value={userPass}
        onChangeText={setUserPass}
      />
      <MyButton onPress={userLogin} title='Entrar no App'/>
    </View>
  );
}
