import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import ScanBarCodeScreen from "../screens/ScanBarCode/ScanBarCodeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { InventoryScreen } from "../screens/Inventory/InventoryScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
    SignIn: undefined;
    Home: undefined;
    // Adicione outras rotas aqui
};
export type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const Stack = createNativeStackNavigator();

export function NavegationRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignInScreen">
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ScanBarCode" component={ScanBarCodeScreen} />
                <Stack.Screen name="Iventory" component={InventoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default NavegationRoutes;