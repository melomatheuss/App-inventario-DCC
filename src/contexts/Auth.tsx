
/*

import { createContext } from "react";

interface AuthData{
    token: string;
    email: string;
    name: string;
    //outros dados que podem ser necessarios para o usuario logado
}

interface AuthContextData{
    authData: AuthData;
    signIn:(email: string, password: string) => Promise< AuthData>;
    signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);  //define a formacomo os dados sao apresentados

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
      const [authData, setAuthData] = useState<AuthData | null>(null);
    return <AuthContext.Provider value = {{authData, signIn, signOut}}>{children}</AuthContext.Provider>;
    
};

*/

