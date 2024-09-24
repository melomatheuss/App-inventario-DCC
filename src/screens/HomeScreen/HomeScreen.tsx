import React from 'react';
import {View, Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyButton} from '../../components/MyButton';
import {styles} from '../styles';


type RootStackParamList = {
  Inventory: undefined;
  ScanBarCode:undefined;
  Registration:undefined;
  // Adicione outras rotas aqui conforme necessário
};

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const {signOut} = useAuth();

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
        // onPress={signOut}
        title="Sair do App"
      />
      <Text>
        DCC
      </Text>
    </View>
  );
}