// styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    padding: 10,
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: 'red', // Cor de fundo vermelha
    padding: 5, // Menor que o padrão
    borderRadius: 5, // Bordas arredondadas
    justifyContent: 'center', // Centraliza o texto
    alignItems: 'center', // Alinha o texto ao centro
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    // Estilos para o botão "Gerar Planilha"
  },

  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
},
modalContent: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  marginBottom: 10,
},
modalCloseButton: {
  marginTop: 10,
  padding: 10,
  backgroundColor: '#007BFF',
  borderRadius: 5,
},
modalCloseText: {
  color: 'white',
  fontWeight: 'bold',
},

  
});
