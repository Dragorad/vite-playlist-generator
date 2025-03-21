import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './stateContext/indexContext';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase конфигурация
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_USER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_USER_FIREBASE_APP_ID
};

console.log(firebaseConfig);

// Инициализиране на Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

const App = lazy(() => import('./App'));

const ImgLoader = () => (
  <img src='./svg-icons/busic-player-circle-start.svg' alt='Loading...' />
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Suspense fallback={<ImgLoader />}>
        <App />
      </Suspense>
    </AppContextProvider>
  </React.StrictMode>
);

serviceWorker.register();
