import { createContext, useContext } from 'react';
import createFirebaseService from './firebaseConfig';

const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({ children }) => {
  const firebaseService = createFirebaseService();

  return (
    <FirebaseContext.Provider value={firebaseService}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};