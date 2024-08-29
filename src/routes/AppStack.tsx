import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import ScanBarCodeScreen from "../screens/ScanBarCodeScreen";
import { iventoryScreen } from "../screens/Inventory";

const Stack = createNativeStackNavigator();


export function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ScanBarCode" component={ScanBarCodeScreen} />
            <Stack.Screen name="iventory" component={iventoryScreen} />
        </Stack.Navigator>
    )
}

export default AppStack;