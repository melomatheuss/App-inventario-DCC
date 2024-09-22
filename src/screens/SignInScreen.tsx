import React, { useState } from 'react';
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

  function userLogin() {
    auth().signInWithEmailAndPassword(userMail, userPass).then(() => {
      alert('Login efetuado com sucesso');
      navigation.navigate('Home');
    })
    .catch(error => {
      alert('Login invalido! Tente novamente.')
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage)
    });
  }
  
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image 
        style={{ 
          width: 200,
          height: 200,
          marginBottom: 10                                                  // Reduz o espaço entre a logo e o texto
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
      <MyButton onPress = {userLogin} title='Entrar no App'/>
    </View>
  );
}
