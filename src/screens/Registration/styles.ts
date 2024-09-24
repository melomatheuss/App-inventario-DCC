// styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  cameraContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  targetLine: {
    width: '80%',
    height: 2,
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
  },
  photoButton: {
    backgroundColor: '#68b2be',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  toggleCameraButton: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  qrButton: {
    backgroundColor: '#68b2be',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#68b2be',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cameraPreview: {
    width: 200, // Largura reduzida para iniciar em quadrado
    height: 200,
    alignSelf: 'center', // Centralizado na tela
  },
  fullScreenContainer: {
    flex: 1, // Ocupa toda a tela
    justifyContent: 'flex-end', // Para alinhar o botão de sair na parte inferior
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  fullScreenCamera: {
    flex: 1, // Ocupa toda a tela
    width: '100%',
    height: '100%',
  },
  exitButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente
    padding: 10, // Tamanho reduzido
    borderRadius: 5,
    alignSelf: 'center', // Centralizado na tela
    marginBottom: 20, // Margem inferior para o botão
    position: 'absolute', // Posiciona o botão de forma absoluta
    top: 40, // Distância do topo da tela
    right: 20, // Distância do lado direito da tela
  },
});
