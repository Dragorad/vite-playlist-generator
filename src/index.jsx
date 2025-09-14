import React, { Suspense, lazy, } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContextProvider, } from './stateContext/indexContext'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './auth/authService'

const App = lazy(() => import('./App'))

// Re-export auth functions and app instance
export { app, loginAnonymous, loginWithEmail, loginWithGoogle } from './auth/authService'
// Re-export API functions
export { getNewPlayList, setTitleUrl, setTitleGenres, setTitleInstruments } from './api/playlistApi'


const ImgLoader = () => (
  <img src='./svg-icons/busic-player-circle-start.svg' alt='Loading...' />
)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppContextProvider >
      {/* <ApolloProvider client={client}> */}
        <Suspense fallback={<ImgLoader />}>
          <App />
        </Suspense>
      {/* </ApolloProvider> */}
    </AppContextProvider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

