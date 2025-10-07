import { auth } from './firebaseConfig';
import { signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Current user state
export const getCurrentUser = () => auth.currentUser;

// Anonymous login
export const loginAnonymous = async () => {
  const userCredential = await signInAnonymously(auth);
  return userCredential.user;
};

// Email/Password login
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Register new user
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Google login (placeholder - needs Google provider setup)
export const loginWithGoogle = async () => {
  // TODO: Implement Google OAuth
  throw new Error('Google login not implemented yet');
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Legacy app object for compatibility
export const app = {
  get currentUser() {
    return auth.currentUser ? {
      id: auth.currentUser.uid,
      isLoggedIn: true
    } : null;
  }
};