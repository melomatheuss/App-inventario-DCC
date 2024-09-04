import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { MyButton } from '../../components/MyButton';
import { styles } from './styles';

export function InventoryScreen() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchItem = () => {
    setShowSearchBox(true);
  };

  const handleSearch = () => {
    console.log(`Procurando por: ${searchQuery}`);
    // Lógica para buscar o item no banco de dados
  };

  const handleCancelSearch = () => {
    setSearchQuery(''); // Limpa o campo de busca
    setShowSearchBox(false); // Fecha a caixa de busca
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventário</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MyButton 
          title="Pesquisar Item" 
          onPress={handleSearchItem} 
          style={styles.button} 
        />
        <MyButton 
          title="Alterar Item" 
          onPress={() => {/* Lógica para alterar item */}} 
          style={styles.button} 
        />
        <MyButton 
          title="Remover Item" 
          onPress={() => {/* Lógica para remover item */}} 
          style={styles.button} 
        />
        <MyButton 
          title="Gerar Planilha" 
          onPress={() => {/* Lógica para gerar planilha */}} 
          style={styles.button} 
        />
      </ScrollView>

      {showSearchBox && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome ou número de série"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <MyButton title="Buscar" onPress={handleSearch} />
          <MyButton title="Cancelar" onPress={handleCancelSearch} style={styles.cancelButton} />
        </View>
      )}
    </View>
  );
}
