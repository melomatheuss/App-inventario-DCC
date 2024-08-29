import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { MyTextInput } from '../components/MyTextInput';
import { styles } from './styles';

import { MyButton } from '../components/MyButton';
import logo from '../../src/assets/logo.png';
import { useAuth } from '../contexts/Auth';

export function SignInScreen() {
  const {signIn} = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image 
        style={{ 
          width: 200,
          height: 200,
          marginBottom: 10  // Reduz o espaço entre a logo e o texto
        }}
        resizeMode='contain'
        source={logo}
      />
  
      <MyTextInput
        placeholder='E-mail'
        value={email}
        onChangeText={setEmail}
      />
      <MyTextInput 
        secureTextEntry
        placeholder='Senha'
        value={password}
        onChangeText={setPassword}
      />
      <MyButton onPress = {() => signIn(email, password)} title='Entrar no App'/>
    </View>
  );
}
