import React from 'react';
import {View, Text} from 'react-native';
import {MyButton} from '../components/MyButton';
import {useAuth} from '../contexts/Auth';
import {styles} from './styles';

export function IventoryScreen() {   // TODO: fazer a parte de vizualizacao de dados do iventario
  const {signOut} = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventário</Text>

    </View>
  );
}