import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    Inventory: undefined;
    ScanBarCode: undefined;
    Registration: undefined;
    // Adicione outras rotas aqui conforme necessário
};

export function RegistrationScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    // Pedir permissões para a câmera e a galeria
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
        })();
    }, []);

    // Função para tirar a foto
    const takePicture = async () => {
        if (cameraRef.current && cameraReady) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) {
                setPhotoUri(photo.uri);
                setIsFullScreen(false); // Esconde a câmera e mostra a foto
            }
        }
    };

    // Função para salvar a foto na galeria
    const savePhoto = async () => {
        if (photoUri && hasMediaLibraryPermission) {
            await MediaLibrary.saveToLibraryAsync(photoUri);
            Alert.alert('Sucesso', 'Foto salva na galeria com sucesso!');
        } else {
            Alert.alert('Erro', 'Permissão para acessar a galeria negada.');
        }
    };

    // Verifica se a câmera tem permissão
    if (hasCameraPermission === null) {
        return <View><Text>Solicitando permissão para a câmera...</Text></View>;
    }

    if (hasCameraPermission === false) {
        return <View><Text>Permissão para usar a câmera foi negada.</Text></View>;
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

            {/* Renderiza a câmera apenas se estiver em tela cheia */}
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
                // Exibe a foto capturada com opções de salvar ou tirar outra foto
                <View style={styles.fullScreenContainer}>
                    <Image source={{ uri: photoUri }} style={styles.fullScreenCamera} />
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.qrButton} onPress={savePhoto}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => {
                            setPhotoUri(null); // Limpa a foto atual
                            setIsFullScreen(true); // Abre a câmera novamente
                        }}>
                            <Text style={styles.buttonText}>Tirar Outra</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                // Botão para abrir a câmera
                <TouchableOpacity style={styles.photoButton} onPress={() => setIsFullScreen(true)}>
                    <Text style={styles.buttonText}>Abrir Câmera</Text>
                </TouchableOpacity>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('ScanBarCode')}>
                    <Text style={styles.buttonText}>QR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={() => { /* Lógica de salvar */ }}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}