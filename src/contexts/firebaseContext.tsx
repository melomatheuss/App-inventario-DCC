// import React, { Children, createContext, useEffect, useState } from 'react';
// import auth from "@react-native-firebase/auth"

// export interface IFirebaseContext {
//     loading: boolean;
// }

// export interface IFirebaseProvider{
//     children : React.ReactNode;
// }

// export const FirebaseContext = createContext({
//     loading: true, 
// } as IFirebaseContext);

// export const FirebaseProvider: React.FC<IFirebaseProvider> = ({ children }) => {
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged((user) => {
//           setLoading(false);
//         });
//         return subscriber;
//     }, []);

//     if (loading) return null;

//     return (
//         <FirebaseContext.Provider value={{ loading }}>
//             {children}
//         </FirebaseContext.Provider>
//     );
// }

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IFirebaseContext {
    loading: boolean;
}

export interface IFirebaseProviderProps {
    children: ReactNode;
}

export const FirebaseContext = createContext<IFirebaseContext>({
    loading: false,
});

export const FirebaseProvider: React.FC<IFirebaseProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {return null};

    return (
        <FirebaseContext.Provider value={{ loading }}>
            {children}
        </FirebaseContext.Provider>
    );
};
