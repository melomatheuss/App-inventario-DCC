import React from 'react';
import {View, Text} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyButton} from '../components/MyButton';
import {styles} from './styles';


type RootStackParamList = {
  iventory: undefined;
  ScanBarCode:undefined;
  // Adicione outras rotas aqui conforme necessário
};

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      </Text>
      <MyButton
        title="Registrar Item"
        onPress={() => navigation.navigate ('ScanBarCode')}
      />
      <MyButton title='Inventário' onPress={() => navigation.navigate('iventory')}/>
      <Text>
        DCC
      </Text>
    </View>
  );
}