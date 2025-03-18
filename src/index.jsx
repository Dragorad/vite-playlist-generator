// import React, { Suspense, lazy, } from 'react'
// import { createRoot } from 'react-dom/client'
// import { AppContextProvider, } from './stateContext/indexContext'
// import './index.css'
// // import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// // import { setContext } from "@apollo/client/link/context";
// // import { ApolloProvider } from "@apollo/client";
// import * as serviceWorker from './serviceWorker'
// import * as RealmWeb from "realm-web"
// import { APP_ID } from './credential/AppId';

// const App = lazy(() => import('./App'))

// export const app = new RealmWeb.App({
//   id: APP_ID,
//   // baseUrl: "https://realm.mongodb.com"
// });
// // console.log(app.currentUser)

// const credentials = RealmWeb.Credentials.anonymous();
// try {
//   // Authenticate the user
//   const user = app.logIn(credentials)
//     .then(user => {
//       console.log('Loged anonimous ', user.id)
//     })
//   // `App.currentUser` updates to match the logged in user
//   // assert(user.id === app.currentUser.id)
//   // return user
// }
// catch (err) {
//   console.error("Failed to log in", err);
// }
// // Add an Authorization header with a valid user access token to all GraphQL requests
// // const authorizationHeaderLink = setContext(async (_, { headers }) => {
// //   if (app.currentUser) {
// //     // Refreshing custom data also refreshes the access token
// //     await app.currentUser.refreshCustomData();
// //   } else {
// //     // If no user is logged in, log in an anonymous user

// //     // await app.logIn(RealmWeb.Credentials.anonymous());
// //     console.log('from index.js', app.user)
// //   }
// //   // Get a valid access token for the current user
// //   const { accessToken } = app.currentUser;
// //   console.log("currentUser", accessToken, app.currentUser);

// //   // Set the Authorization header, preserving any other headers
// //   return {
// //     headers: {
// //       ...headers,

// //       Authorization: `Bearer ${accessToken}`

// //     }
// //   };
// // });

// // // Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
// // const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
// // const httpLink = new HttpLink({ uri: graphql_url });

// // // Construct a new Apollo client with the links we just defined
// // const client = new ApolloClient({
// //   link: authorizationHeaderLink.concat(httpLink),
// //   cache: new InMemoryCache()
// // });

// export const getNewPlayList = async (inputObj) => {
//   const playlist = await app.currentUser.callFunction('generatePlaylist', inputObj)
//   return playlist
// }

// export const setTitleUrl = async (urlObj) => {
//   const result = await app.currentUser.callFunction('updateTitleUrl', urlObj)
//   return result
// }
// export const setTitleGenres = async (genreObj) => {
//   const result = await app.currentUser.callFunction('updateTitleGenres', genreObj)
//   return result
// }
// export const setTitleInstruments = async (instrumObj) => {
//   const result = await app.currentUser.callFunction('updateTitleInstruments', instrumObj)
//   return result
// }


// const ImgLoader = () => {
//   return (
//     <>

//       <img src='./svg-icons/busic-player-circle-start.svg'

//         alt='LLLLLLLLLLLLLLLoading...' />
//     </>
//   )
// }

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <AppContextProvider >
//       {/* <ApolloProvider client={client}> */}
//         <Suspense fallback={ImgLoader}>
//           <App />
//         </Suspense>
//       {/* </ApolloProvider> */}
//     </AppContextProvider>
//   </React.StrictMode>
// )

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register()

import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './stateContext/indexContext';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase конфигурация
const firebaseConfig = {
  apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_USER_FIREBASE_APP_ID
};
// console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log(firebaseConfig.apiKey);

// Инициализиране на Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Анонимна автентикация
signInAnonymously(auth)
  .then(() => {
    console.log('Logged in anonymously');
  })
  .catch((error) => {
    console.error("Failed to log in", error);
  });

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in with email:', userCredential.user);
    } catch (error) {
      console.error('Error logging in with email:', error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Logged in with Google:', result.user);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

const App = lazy(() => import('./App'));

const ImgLoader = () => (
  <img src='./svg-icons/busic-player-circle-start.svg' alt='Loading...' />
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Suspense fallback={ImgLoader}>
        <App />
      </Suspense>
    </AppContextProvider>
  </React.StrictMode>
);

serviceWorker.register();