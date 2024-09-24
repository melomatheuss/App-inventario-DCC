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
  resultsContainer: {
    marginTop: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
  },
  itemImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemTombo: {
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemLocalizacao: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#DAD7CD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  noResultsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5', // Cor de fundo do botão
    marginLeft: 10, // Espaçamento à esquerda
  },
});