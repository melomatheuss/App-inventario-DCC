import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function ScanBarCodeScreen() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);

  if (!hasPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!hasPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = (scanningResult: { data: string }) => {
    setScanned(true);
    alert(`Código de barras encontrado: ${scanningResult.data}`);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPhotoUri(photo.uri);

        // Salva a foto na galeria
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        alert('Foto salva na galeria com sucesso!');
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
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
        {/* Linha de mira menor e centralizada */}
        <View style={styles.targetLine} />
      </CameraView>

      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.photo} />
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
    top: '50%', // Centraliza verticalmente
    left: '25%', // Começa a 25% da largura da tela
    right: '25%', // Termina a 75% da largura da tela (linha centralizada)
    height: 2, // Altura da linha
    backgroundColor: '#F0F0F0', // Cor da linha
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
});
