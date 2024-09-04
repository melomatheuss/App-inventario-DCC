import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 8, // Menor padding vertical
    paddingHorizontal: 16, // Menor padding horizontal
    borderRadius: 5, // Ajuste o borderRadius se necessário
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FF6347', // Cor diferente para o botão "Cancelar"
    paddingVertical: 8, // Menor padding vertical
    paddingHorizontal: 16, // Menor padding horizontal
    borderRadius: 5, // Ajuste o borderRadius se necessário
  },
});
