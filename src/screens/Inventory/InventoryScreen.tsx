// import React, { useEffect, useState } from 'react';
// import { View, TextInput, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
// import { MyButton } from '../../components/MyButton';
// import firestore from '@react-native-firebase/firestore';
// import { stylesInventario } from '../styles';

// interface Item {
//   id: string;
//   nome: string;
//   descricao: string;
//   estado: string;
//   tombo: number;
//   categoria: string;
// }

// export function InventoryScreen() {
//   const [showSearchBox, setShowSearchBox] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [categoryQuery, setCategoryQuery] = useState(''); 
//   const [results, setResults] = useState<Item[]>([]); // Estado inicial para os resultados da busca

//   // Função para exibir o campo de busca
//   const handleSearchItem = () => {
//     setShowSearchBox(true);
//   };

//   // Função para realizar a busca no Firestore
//   const handleSearch = async () => {
//     console.log(`Procurando por tombo: ${searchQuery},  categoria: ${categoryQuery}`);

//     // Valida se o usuário inseriu um número de tombo válido
//     const tomboNumber = parseInt(searchQuery, 10);
//     if (isNaN(tomboNumber)) {
//       alert('Por favor, insira um número de tombo válido.');
//       return;
//     }

//     try {
//       // Busca no Firestore pelo número de tombo
//       const querySnapshot = await firestore()
//         .collection('itens')
//         .where('tombo', '==', tomboNumber) // Busca por número de tombo
//         .where('categoria ', '==', categoryQuery)
//         .get();

//       const searchResults: Item[] = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }) as Item);

//       setResults(searchResults);
//     } catch (error) {
//       console.error('Erro ao buscar os itens: ', error);
//     }
//   };

//   // Função para cancelar a busca
//   const handleCancelSearch = () => {
//     setSearchQuery('');
//     setShowSearchBox(false);
//     setCategoryQuery('');// Limpa a categoria também
//     setResults([]); // Limpa os resultados
//   };

//   return (
//     <View style={stylesInventario.container}>
//       <Text style={stylesInventario.title}>Inventário</Text>

//       <ScrollView contentContainerStyle={stylesInventario.scrollContainer}>
//         <MyButton 
//           title="Pesquisar Item" 
//           onPress={handleSearchItem} 
//           style={stylesInventario.button} 
//         />
//         <MyButton 
//           title="Alterar Item" 
//           onPress={() => { /* Lógica para alterar item */ }} 
//           style={stylesInventario.button} 
//         />
//         <MyButton 
//           title="Remover Item" 
//           onPress={() => { /* Lógica para remover item */ }} 
//           style={stylesInventario.button} 
//         />
//         <MyButton 
//           title="Gerar Planilha" 
//           onPress={() => { /* Lógica para gerar planilha */ }} 
//           style={stylesInventario.button} 
//         />
//       </ScrollView>

//       {showSearchBox && (
//         <View style={stylesInventario.searchContainer}>
//           <TextInput
//             style={stylesInventario.searchInput}
//             placeholder="Digite o número de tombo"
//             value={searchQuery}
//             keyboardType="numeric" // Para garantir que o teclado numérico seja exibido
//             onChangeText={setSearchQuery}
//           />
//           <TextInput
//             style={stylesInventario.searchInput}
//             placeholder="Digite a categoria"
//             value={categoryQuery}
//             keyboardType="numeric" // Para garantir que o teclado numérico seja exibido
//             onChangeText={setCategoryQuery}
//           />
//           <MyButton title="Buscar" onPress={handleSearch} />
//           <MyButton title="Cancelar" onPress={handleCancelSearch} style={stylesInventario.cancelButton} />
//         </View>
//       )}

//       {/* Exibe os resultados da busca */}
//       {results.length > 0 && (
//         <View style={stylesInventario.resultsContainer}>
//           {results.map((item, index) => (
//             <Text key={index} style={stylesInventario.resultItem}>
//               {item.nome} - {item.descricao} - {item.estado} - Tombo: {item.tombo} - categoria: {item.categoria}
//             </Text>
//           ))}
//         </View>
//       )}

//       {/* Exibe uma mensagem se nenhum item for encontrado */}
//       {results.length === 0 && searchQuery && (
//         <View style={stylesInventario.resultsContainer}>
//           <Text>Nenhum item encontrado para o tombo: {searchQuery} e categoria: {categoryQuery}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { MyButton } from '../../components/MyButton';
import firestore from '@react-native-firebase/firestore';
import { stylesInventario } from '../styles';

interface Item {
  id: string;
  nome: string;
  descricao: string;
  estado: string;
  tombo: number;
  categoria: string;
}

export function InventoryScreen() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [results, setResults] = useState<Item[]>([]);

  // Função para exibir o campo de busca
  const handleSearchItem = () => {
    setShowSearchBox(true);
  };

  // Função para realizar a busca no Firestore
  const handleSearch = async () => {
    console.log(`Procurando por tombo: ${searchQuery}, categoria: ${categoryQuery}`);

    const tomboNumber = parseInt(searchQuery, 10);
    const searchResults: Item[] = [];

    try {
      if (!isNaN(tomboNumber)) {
        // Caso o usuário tenha inserido um número de tombo
        const querySnapshotTombo = await firestore()
          .collection('itens')
          .where('tombo', '==', tomboNumber)
          .get();

        searchResults.push(
          ...querySnapshotTombo.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }) as Item)
        );
      }

      if (categoryQuery) {
        // Caso o usuário tenha inserido uma categoria
        const querySnapshotCategoria = await firestore()
          .collection('itens')
          .where('categoria', '==', categoryQuery)
          .get();

        searchResults.push(
          ...querySnapshotCategoria.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }) as Item)
        );
      }

      // Remove duplicatas, caso tenha buscado pelo tombo e categoria
      const uniqueResults = Array.from(new Set(searchResults.map((item) => item.id)))
        .map((id) => searchResults.find((item) => item.id === id));

      setResults(uniqueResults as Item[]); // Atualiza os resultados com itens únicos
    } catch (error) {
      console.error('Erro ao buscar os itens: ', error);
    }
  };

  // Função para cancelar a busca
  const handleCancelSearch = () => {
    setSearchQuery('');
    setCategoryQuery('');
    setShowSearchBox(false);
    setResults([]);
  };

  return (
    <View style={stylesInventario.container}>
      <Text style={stylesInventario.title}>Inventário</Text>

      <ScrollView contentContainerStyle={stylesInventario.scrollContainer}>
        <MyButton
          title="Pesquisar Item"
          onPress={handleSearchItem}
          style={stylesInventario.button}
        />
        <MyButton
          title="Alterar Item"
          onPress={() => {
            /* Lógica para alterar item */
          }}
          style={stylesInventario.button}
        />
        <MyButton
          title="Remover Item"
          onPress={() => {
            /* Lógica para remover item */
          }}
          style={stylesInventario.button}
        />
        <MyButton
          title="Gerar Planilha"
          onPress={() => {
            /* Lógica para gerar planilha */
          }}
          style={stylesInventario.button}
        />
      </ScrollView>

      {showSearchBox && (
        <View style={stylesInventario.searchContainer}>
          <TextInput
            style={stylesInventario.searchInput}
            placeholder="Digite o número de tombo"
            value={searchQuery}
            keyboardType="numeric"
            onChangeText={setSearchQuery}
          />
          <TextInput
            style={stylesInventario.searchInput}
            placeholder="Digite a categoria"
            value={categoryQuery}
            onChangeText={setCategoryQuery}
          />
          <MyButton title="Buscar" onPress={handleSearch} />
          <MyButton title="Cancelar" onPress={handleCancelSearch} style={stylesInventario.cancelButton} />
        </View>
      )}

      {results.length > 0 && (
        <View style={stylesInventario.resultsContainer}>
          {results.map((item, index) => (
            <Text key={index} style={stylesInventario.resultItem}>
              {item.nome} - {item.descricao} - {item.estado} - Tombo: {item.tombo} - Categoria: {item.categoria}
            </Text>
          ))}
        </View>
      )}

      {results.length === 0 && searchQuery && (
        <View style={stylesInventario.resultsContainer}>
          <Text>
            Nenhum item encontrado para os critérios fornecidos.
          </Text>
        </View>
      )}
    </View>
  );
}