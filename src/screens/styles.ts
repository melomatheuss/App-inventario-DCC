import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', //tem q trocar essa jaca por "center dps e criar um style  pra cada elemento ae principalmente prop botao"
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontWeight: 'bold',

    fontSize: 20,
    textAlign: 'center',
  },

});

export const stylesInventario = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
  },
  searchContainer: {
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  cancelButton: {
    marginTop: 10,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    fontSize: 18,
    marginBottom: 10,
  },

});