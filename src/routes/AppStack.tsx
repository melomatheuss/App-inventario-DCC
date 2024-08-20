import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import ScanBarCodeScreen from "../screens/ScanBarCodeScreen";

const Stack = createNativeStackNavigator();


export function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ScanBarCode" component={ScanBarCodeScreen} />
        </Stack.Navigator>
    )
}

export default AppStack;