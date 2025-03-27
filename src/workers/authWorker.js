import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  getAuth
} from "firebase/auth";

import { app } from '../index'; // Импортираме само app

export const signOut = async () => {
  try {
    const auth = getAuth(app);
    await auth.signOut();
    console.log("Logged out");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
};

export const signInNoCredentials = async () => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInAnonymously(auth);
    console.log("Logged in anonymously:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error logging in anonymously:", error);
    return { success: false, error };
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Signed up with email:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing up with email:", error);
    return { success: false, error };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Logged in with email:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error logging in with email:", error);
    return { success: false, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Logged in with Google:", result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Error logging in with Google:", error);
    return { success: false, error };
  }
};