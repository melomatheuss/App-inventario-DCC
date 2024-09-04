import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import ScanBarCodeScreen from "../screens/ScanBarCode/ScanBarCodeScreen";
import { InventoryScreen } from "../screens/Inventory/InventoryScreen";

const Stack = createNativeStackNavigator();


export function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ScanBarCode" component={ScanBarCodeScreen} />
            <Stack.Screen name="Iventory" component={InventoryScreen} />
        </Stack.Navigator>
    )
}

export default AppStack;