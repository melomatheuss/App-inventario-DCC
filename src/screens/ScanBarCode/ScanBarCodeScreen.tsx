// import React, { useState, useRef } from 'react';
// import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

// export default function ScanBarCodeScreen() {
//   const [hasPermission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [facing, setFacing] = useState<CameraType>('back');
//   const cameraRef = useRef<CameraView>(null);

//   if (!hasPermission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!hasPermission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const handleBarcodeScanned = (scanningResult: { data: string }) => {
//     setScanned(true);
//     alert(`Código de barras encontrado: ${scanningResult.data}`);
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       if (photo) {
//         setPhotoUri(photo.uri);

//         // Salva a foto na galeria
//         await MediaLibrary.saveToLibraryAsync(photo.uri);
//         alert('Foto salva na galeria com sucesso!');
//       }
//     }
//   };

//   const toggleCameraFacing = () => {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//         onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: [
//             'aztec',
//             'ean13',
//             'ean8',
//             'qr',
//             'pdf417',
//             'upc_e',
//             'datamatrix',
//             'code39',
//             'code93',
//             'itf14',
//             'codabar',
//             'code128',
//             'upc_a',
//           ]
//         }}
//       >
//         {/* Linha de mira menor e centralizada */}
//         <View style={styles.targetLine} />
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </CameraView>

//       {photoUri && (
//         <Image source={{ uri: photoUri }} style={styles.photo} />
//       )}

//       <Button title={'Tirar Foto'} onPress={takePicture} />
//       {scanned && (
//         <Button title={'Toque para escanear de novo'} onPress={() => setScanned(false)} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   targetLine: {
//     position: 'absolute',
//     top: '50%', // Centraliza verticalmente
//     left: '25%', // Começa a 25% da largura da tela
//     right: '25%', // Termina a 75% da largura da tela (linha centralizada)
//     height: 2, // Altura da linha
//     backgroundColor: '#F0F0F0', // Cor da linha
//   },
//   photo: {
//     width: '100%',
//     height: 200,
//     marginVertical: 10,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
// });


import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function ScanBarCodeScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [tombo, setTombo] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estado, setEstado] = useState('');
  const [categoria, setCategoria] = useState('');
  const cameraRef = useRef<CameraView>(null); 
  const [uploading, setUploading] = useState(false);

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = (scanningResult: { data: string }) => {
    setScanned(true);
    const tomboScanned = parseInt(scanningResult.data, 10);

    if (!isNaN(tomboScanned)) {
      setTombo(tomboScanned); // Define o valor de tombo como o código de barras escaneado
      alert(`Tombo encontrado: ${scanningResult.data}`);
    } else {
      alert('Código de barras inválido para um tombo.');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPhotoUri(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        alert('Foto salva na galeria com sucesso!');
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const uploadImage = async (uri: string) => {
    const fileName = `itens/${Date.now()}.jpg`; // Nome único para a imagem
    const storageRef = storage().ref(fileName); // Referência no Firebase Storage
    
    setUploading(true);// Indica que o upload está em andamento

    const response = await fetch(uri); // Busca o arquivo local
    const blob = await response.blob(); // Converte para blob

    try {
      await storageRef.put(blob); // Faz o upload da imagem para o Firebase Storage
      const downloadURL = await storageRef.getDownloadURL(); // Obtém a URL pública da imagem
      setUploading(false); // Upload concluído
      return downloadURL; // Retorna a URL para salvar no Firestore
    } catch (error) {
      setUploading(false);
      console.error('Erro ao fazer upload da imagem: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer upload da imagem.');
      return null;
    }
  };

  // Função para cadastrar o item no Firestore
  const handleRegisterItem = async () => {
    if (!tombo || !nome || !descricao || !estado || !categoria) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    let imageUrl = null;
    if (photoUri) {
      imageUrl = await uploadImage(photoUri); // Faz o upload da imagem e obtém a URL
    }

    try {
      await firestore().collection('itens').add({
        nome,
        descricao,
        estado,
        tombo,
        categoria,
        imagem: imageUrl, // Salva a URL da imagem no Firestore
      });
      Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setEstado('');
      setCategoria('');
      setTombo(null);
      setPhotoUri(null);
      setScanned(false); // Permite o scan de novo
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o item no Firestore.');
      console.error('Erro ao cadastrar item: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {!tombo ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: [
              'aztec',
              'ean13',
              'ean8',
              'qr',
              'pdf417',
              'upc_e',
              'datamatrix',
              'code39',
              'code93',
              'itf14',
              'codabar',
              'code128',
              'upc_a',
            ]
          }}
        >
          <View style={styles.targetLine} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        // Formulário para preencher os detalhes do item
        <View style={styles.formContainer}>
          <Text>Tombo: {tombo}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado (ex: Novo, Usado)"
            value={estado}
            onChangeText={setEstado}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={categoria}
            onChangeText={setCategoria}
          />
          <Button title="Cadastrar Item" onPress={handleRegisterItem} />
        </View>
      )}

      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      {!tombo && (
        <Button title={'Tirar Foto'} onPress={takePicture} />
      )}
      {scanned && (
        <Button title={'Toque para escanear de novo'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  targetLine: {
    position: 'absolute',
    top: '50%',
    left: '25%',
    right: '25%',
    height: 2,
    backgroundColor: '#F0F0F0',
  },
  photo: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  formContainer: {
    padding: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
});
//1. lemnbrade de arrumar para poder editar o tombo caso nao consiga scannear
//2. Tem que arrumar o codigo da consulta do database pra poder aparecer a imagem tambem
//3. Tenta enteder o que tu fez nesse codigos vagabundo