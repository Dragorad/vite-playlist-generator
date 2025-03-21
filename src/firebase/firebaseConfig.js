import { initializeApp } from 'firebase/app';

const createFirebaseService = () => {
  let app = null;
  let authInstance = null;
  let dbInstance = null;

  const initializeFirebase = async () => {
    if (!app) {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_USER_FIREBASE_APP_ID
      };
      console.log(firebaseConfig);

      app = initializeApp(firebaseConfig);
    }
    return app;
  };

  const getAuth = async () => {
    if (!authInstance) {
      await initializeFirebase();
      const { getAuth } = await import('firebase/auth');
      authInstance = getAuth(app);
    }
    return authInstance;
  };

  const getFirestore = async () => {
    if (!dbInstance) {
      await initializeFirebase();
      const { getFirestore } = await import('firebase/firestore');
      dbInstance = getFirestore(app);
    }
    return dbInstance;
  };

  const signInAnonymously = async () => {
    const auth = await getAuth();
    const { signInAnonymously: signIn } = await import('firebase/auth');
    return signIn(auth);
  };

  const signInWithGoogle = async () => {
    const auth = await getAuth();
    const { 
      GoogleAuthProvider, 
      signInWithPopup 
    } = await import('firebase/auth');
    
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    const auth = await getAuth();
    const { signOut: firebaseSignOut } = await import('firebase/auth');
    return firebaseSignOut(auth);
  };

  const addDocument = async (collectionName, data) => {
    const db = await getFirestore();
    const { collection, addDoc } = await import('firebase/firestore');
    return addDoc(collection(db, collectionName), data);
  };

  const getDocuments = async (collectionName, queryConstraints = []) => {
    const db = await getFirestore();
    const { 
      collection, 
      query, 
      getDocs 
    } = await import('firebase/firestore');
    
    const collectionRef = collection(db, collectionName);
    const q = queryConstraints.length > 0 
      ? query(collectionRef, ...queryConstraints) 
      : collectionRef;
    
    return getDocs(q);
  };

  return {
    initializeFirebase,
    getAuth,
    getFirestore,
    signInAnonymously,
    signInWithGoogle,
    signOut,
    addDocument,
    getDocuments
  };
};

export default createFirebaseService;