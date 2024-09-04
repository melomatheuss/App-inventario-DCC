import React from 'react';
import {View, Text} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyButton} from '../../components/MyButton';
import {styles} from '../styles';
import { useAuth } from '../../contexts/Auth';


type RootStackParamList = {
  Iventory: undefined;
  ScanBarCode:undefined;
  // Adicione outras rotas aqui conforme necessário
};

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      </Text>
      <MyButton
        title="Registrar Item"
        onPress={() => navigation.navigate ('ScanBarCode')}
      />
      <MyButton title='Inventário' onPress={() => navigation.navigate('Iventory')}/>
      <MyButton
        style={{backgroundColor: 'red'}}
        onPress={signOut}
        title="Sair do App"
      />
      <Text>
        DCC
      </Text>
    </View>
  );
}