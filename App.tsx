import React from 'react';
import { NavegationRoutes } from './src/routes/Router';
import { FirebaseProvider } from './src/contexts/firebaseContext';

const App = () => {

  return(
    <FirebaseProvider>
      <NavegationRoutes/>
    </FirebaseProvider>
  );
};

export default App;
