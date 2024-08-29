import React, { useContext, useState } from "react";
import { createContext } from "react";
import { authService } from "../services/authService";
import { Alert } from "react-native";



export interface AuthData{
    token: string;
    email: string;
    name: string;
    //outros dados que podem ser necessarios para o usuario logado
}

interface AuthContextData{
    authData?: AuthData;
    signIn:(email: string, password: string) => Promise< AuthData>;
    signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);  //define a formacomo os dados sao apresentados

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>();

    async function signIn(email:string, password: string):Promise<AuthData>{
    
    try {
        const auth = await authService.signIn(email, password);

        setAuth(auth);

        return auth;
    } catch (error) {
        Alert.alert(error.message, 'Tente Novamente');
    }
}


    async function signOut():Promise<void>{

        setAuth(undefined);
        return;
    }
    
    
    return (
    <AuthContext.Provider value = {{authData, signIn, signOut}}>
        {children}
    </AuthContext.Provider>    
    );
};

 export function useAuth (){
    const context = useContext(AuthContext);
    return context;
 }
