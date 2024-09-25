
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Animated,
  Image,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from './styles'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Item {
  id: string;
  nome: string;
  descricao: string;
  estado: string;
  tombo: number;
  categoria: string;
  imagem: string;
  localizacao: string; 
}

export function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Estado para controle do modal de confirmação de exclusão
  const [modalAnimation] = useState(new Animated.Value(0));
  const [searchInitiated, setSearchInitiated] = useState(false);

  // Função para adicionar um novo item
  const handleAddItem = async (newItem: Item) => {
    try {
      await firestore().collection('itens').add({
        ...newItem,
        nome: newItem.nome.toLowerCase(),
        localizacao: newItem.localizacao.toLowerCase()
      });
      console.log('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar o item: ', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await firestore().collection('itens').doc(id).delete();
      setResults(prevResults => prevResults.filter(item => item.id !== id)); // Atualiza a lista de resultados
      console.log(`Item ${id} excluído com sucesso.`);
      closeDeleteConfirmation(); // Fecha o modal de confirmação após a exclusão
    } catch (error) {
      console.error('Erro ao excluir o item: ', error);
    }
  };

  const handleSearch = async () => {
    const searchResults: Item[] = [];
    const lowerQuery = searchQuery.toLowerCase();
    try {
      if (searchQuery) {
        // Busca os itens que contêm o termo pesquisado no nome
        const querySnapshotNome = await firestore()
          .collection('itens')
          .get(); 

        querySnapshotNome.forEach((doc) => {
          const itemData = {
            id: doc.id,
            ...doc.data() 
          } as Item;

          if (itemData.nome.toLowerCase().includes(lowerQuery)) {
            searchResults.push(itemData);
          }
        });

        // Busca os itens que contêm o termo pesquisado na localização
        const querySnapshotLocalizacao = await firestore()
          .collection('itens')
          .get();

        querySnapshotLocalizacao.forEach((doc) => {
          const itemData = {
            id: doc.id,
            ...doc.data() 
          } as Item;

          if (itemData.localizacao.toLowerCase().includes(lowerQuery)) {
            searchResults.push(itemData);
          }
        });

        // Remover duplicatas caso um item já tenha sido adicionado
        const uniqueResults = Array.from(new Set(searchResults.map((item) => item.id)))
          .map((id) => searchResults.find((item) => item.id === id));

        setResults(uniqueResults as Item[]);
        setSearchInitiated(true);
      }
    } catch (error) {
      console.error('Erro ao buscar os itens: ', error);
    }
  };

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setShowModal(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(modalAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      setSelectedItem(null);
    });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchInitiated(false);
    setResults([]);
    Keyboard.dismiss();
  };

  // Funções para controle do modal de confirmação de exclusão
  const openDeleteConfirmation = () => setShowDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setShowDeleteConfirmation(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventário</Text>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome ou a localização"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          blurOnSubmit={true}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
          <FontAwesome6 name="times-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {searchInitiated && (
        <>
          {results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{    
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20 
                }}>
                  <TouchableOpacity 
                    onPress={() => openModal(item)} 
                    style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
                  >
                    <Text style={styles.itemText}>{item.nome}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={openDeleteConfirmation} // Abre o modal de confirmação
                    style={[styles.clearButton, { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }]}
                  >
                    <FontAwesome6 name="trash" size={20} color="red"/>
                  </TouchableOpacity>
                </View>
              )}
              style={styles.resultsContainer}
            />
          ) : (
            <Text style={styles.noResultsText}>Nenhum item encontrado</Text>
          )}
        </>
      )}

      {showModal && selectedItem && (
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: modalAnimation }] }]}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <Image source={{ uri: selectedItem.imagem }} style={styles.itemImage} />
              <Text style={styles.itemName}>{selectedItem.nome}</Text>
              <Text style={styles.itemDescription}>{selectedItem.descricao}</Text>
              <Text style={styles.itemTombo}>Tombo - {selectedItem.tombo}</Text>
              <Text style={styles.itemLocalizacao}>Localização - {selectedItem.localizacao}</Text>

              {/* Botão para abrir o modal de confirmação de exclusão */}
              <TouchableOpacity 
                onPress={openDeleteConfirmation}
                style={[styles.clearButton, { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }]} // Adicione um estilo para o botão de exclusão
              >
                <FontAwesome6 name="trash" size={20} color="red"/>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      )}

      {/* Modal de confirmação de exclusão */}
      <Modal transparent={true} visible={showDeleteConfirmation} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              Tem certeza de que deseja excluir este item?
            </Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity onPress={() => { 
                  if (selectedItem) {
                    handleDeleteItem(selectedItem.id); // Exclui o item
                  }
                }} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeDeleteConfirmation} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
