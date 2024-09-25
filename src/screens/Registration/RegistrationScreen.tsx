import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export function RegistrationScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [tombo, setTombo] = useState<number | null>(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [scanned, setScanned] = useState(false);
    const [isScanning, setIsScanning] = useState(false);  // Controla a exibição da câmera para escanear

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Pedir permissões para a câmera e a galeria
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
        })();
    }, []);

    // Função para escanear o código de barras
    const handleBarcodeScanned = (scanningResult: { data: string }) => {
        setScanned(true);
        const tomboScanned = parseInt(scanningResult.data, 10);

        if (!isNaN(tomboScanned)) {
            setTombo(tomboScanned);  // Define o valor do tombo com o resultado escaneado
            Alert.alert('Sucesso', `Tombo encontrado: ${scanningResult.data}`);
            setIsScanning(false);  // Volta para a tela de cadastro
        } else {
            Alert.alert('Erro', 'Código de barras inválido para um tombo.');
        }
    };

    // Função para abrir a câmera de escanear
    const handleOpenScanner = () => {
        setIsScanning(true);
        setScanned(false);
    };

    // Função para tirar a foto
    const takePicture = async () => {
        if (cameraRef.current && cameraReady) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) {
                setPhotoUri(photo.uri);
                setIsFullScreen(false);
            }
        }
    };

    // Função para fazer upload da imagem
    const uploadImage = async (uri: string) => {
        const fileName = `itens/${Date.now()}.jpg`;
        const storageRef = storage().ref(fileName);

        const response = await fetch(uri);
        const blob = await response.blob();

        try {
            await storageRef.put(blob);
            const downloadURL = await storageRef.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.error('Erro ao fazer upload da imagem: ', error);
            Alert.alert('Erro', 'Ocorreu um erro ao fazer upload da imagem.');
            return null;
        }
    };

    // Função para salvar o cadastro no Firestore
    const handleRegisterItem = async () => {
        const nomeLowerCase = name.toLowerCase();
        const locationLowerCase = location.toLowerCase();

        if (!name || !location || !description || !tombo) {
            Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
            return;
        }

        let imageUrl = null;
        if (photoUri) {
            imageUrl = await uploadImage(photoUri);
        }

        try {
            await firestore().collection('itens').add({
                nome: name,
                descricao: description,
                localizacao: location,
                tombo,
                imagem: imageUrl,
                nomeLowerCase: nomeLowerCase,
                locationLowerCase: locationLowerCase,
            });
            Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
            // Limpa os campos
            setName('');
            setDescription('');
            setLocation('');
            setTombo(null);
            setPhotoUri(null);
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o item no Firestore.');
            console.error('Erro ao cadastrar item: ', error);
        }
    };

    if (hasCameraPermission === null) {
        return <View><Text>Solicitando permissão para a câmera...</Text></View>;
    }

    if (hasCameraPermission === false) {
        return <View><Text>Permissão para usar a câmera foi negada.</Text></View>;
    }

    // Exibe a câmera para escanear o código de barras
    if (isScanning) {
        return (
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: [
                        'aztec', 'ean13', 'ean8', 'qr', 'pdf417',
                        'upc_e', 'datamatrix', 'code39', 'code93',
                        'itf14', 'codabar', 'code128', 'upc_a'
                    ]
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Registro</Text>
            </View>

            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Localização" value={location} onChangeText={setLocation} />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={5}
                textAlignVertical='top'
            />
            <TextInput
                style={styles.input}
                placeholder="Tombo"
                value={tombo ? String(tombo) : ''}
                onChangeText={(value) => setTombo(Number(value))}
                keyboardType="numeric"
            />
             {isFullScreen ? (
                <View style={styles.fullScreenContainer}>
                    <CameraView
                        style={styles.fullScreenCamera}
                        ref={cameraRef}
                        onCameraReady={() => setCameraReady(true)}
                    />
                    <TouchableOpacity style={styles.exitButton} onPress={() => setIsFullScreen(false)}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={takePicture}>
                        <Text style={styles.buttonText}>Tirar Foto</Text>
                    </TouchableOpacity>
                </View>
            ) : photoUri ? (
                <View style={styles.fullScreenContainer}>
                    <Image source={{ uri: photoUri }} style={styles.fullScreenCamera} />
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.saveButton} onPress={() => {
                            setPhotoUri(null);
                            setIsFullScreen(true);
                        }}>
                            <Text style={styles.buttonText}>Tirar Outra Foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity style={styles.photoButton} onPress={() => setIsFullScreen(true)}>
                    <Text style={styles.buttonText}>Abrir Câmera</Text>
                </TouchableOpacity>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.qrButton} onPress={handleOpenScanner}>
                    <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleRegisterItem}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
