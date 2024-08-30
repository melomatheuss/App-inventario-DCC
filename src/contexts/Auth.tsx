import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authService } from "../services/authService";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface AuthData {
  token: string;
  email: string;
  name: string;
  // outros dados que podem ser necessários para o usuário logado
}

interface AuthContextData {
  authData?: AuthData;
  signIn: (email: string, password: string) => Promise<AuthData>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    loadFromStorage();
  },1000);
 },[]);

  async function loadFromStorage() {
    const auth = await AsyncStorage.getItem('@AuthData');
    if (auth) {
      setAuth(JSON.parse(auth) as AuthData);
    }
    setLoading(false);
  }

  async function signIn(email: string, password: string): Promise<AuthData> {
    try {
      const auth = await authService.signIn(email, password);
      setAuth(auth);
      AsyncStorage.setItem('@AuthData', JSON.stringify(auth));
      return auth;
    } catch (error: any) {
      Alert.alert(error.message ?? 'Erro desconhecido', 'Tente Novamente');
      throw new Error(error.message);
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
    AsyncStorage.removeItem('@AuthData');
  }

  return (
    <AuthContext.Provider value={{ authData, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
