import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { MyButton } from '../../components/MyButton';
import { styles } from './styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'; // Importando ícones da biblioteca Expo

export function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<{ name: string; serial: string; description: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ name: string; serial: string; description: string } | null>(null);

  const handleSearch = () => {
    console.log(`Procurando por: ${searchQuery}`);

    // Simulação de busca no banco de dados
    const dummyResults = [
      { name: 'Item A', serial: '123', description: 'Descrição do Item A' },
      { name: 'Item B', serial: '456', description: 'Descrição do Item B' },
      { name: 'Item C', serial: '789', description: 'Descrição do Item C' },
    ];

    setResults(dummyResults.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
    setResults([]); // Limpa os resultados
  };

  const openModal = (item: React.SetStateAction<{ name: string; serial: string; description: string; } | null>) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventário</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome ou número de série"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <FontAwesome6 name="magnifying-glass-plus" size={24} color="black" />
        </TouchableOpacity>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleCancelSearch} style={styles.cancelButton}>
            <Text style={{ color: '#fff' }}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.serial}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)} style={styles.resultItem}>
              <Text>{item.name} - {item.serial}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.resultsContainer}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedItem && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalText}>Número de série: {selectedItem.serial}</Text>
              <Text style={styles.modalText}>Descrição: {selectedItem.description}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
