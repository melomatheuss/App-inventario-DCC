import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { InventoryScreen } from "../screens/Inventory/InventoryScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationScreen } from "../screens/Registration/RegistrationScreen";


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
            <Stack.Navigator initialRouteName="SignInScreen"  screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Inventory" component={InventoryScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default NavegationRoutes;