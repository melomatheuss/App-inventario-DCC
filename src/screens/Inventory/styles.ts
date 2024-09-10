import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    marginVertical: 10,
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  resultsContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  resultItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
