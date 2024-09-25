import React from 'react';
import {View, Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyButton} from '../../components/MyButton';
import {styles} from '../styles';
import auth from '@react-native-firebase/auth';

type RootStackParamList = {
  Inventory: undefined;
  ScanBarCode:undefined;
  Registration:undefined;
  SignInScreen: undefined; 
};



export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function logout() {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignInScreen'); // Navega para a tela de login
      })
      .catch(error => {
        console.error('Erro ao sair:', error);
        alert('Erro ao sair. Tente novamente.');
      });
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      </Text>
      <MyButton
        title="Registrar Item"
        onPress={() => navigation.navigate ('Registration')}
      />
      <MyButton title='Inventário' onPress={() => navigation.navigate('Inventory')}/>
      <MyButton
        style={{backgroundColor: 'red'}}
        onPress={logout}
        title="Sair do App"
      />
      <Text>
        DCC
      </Text>
    </View>
  );
}