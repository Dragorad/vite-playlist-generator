import {auth} from "../index";
import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup
} from "firebase/auth";

/**
 * Signs out the current user
 * @param {Auth} auth - Firebase auth instance
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("Logged out");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
};

/**
 * Signs in user anonymously
 * @param {Auth} auth - Firebase auth instance
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export const signInNoCredentials = async ()  => {

  try {
    // await app;
    console.log('Attempting anonymous sign-in');
    console.log('Auth instance:', auth);
    const userCredential = await signInAnonymously(auth);
    console.log("Logged in anonymously:");
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error logging in anonymously:", error);
    return { success: false, error };
  }
};

/**
 * Creates new user account with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export const signUpWithEmail = async (email, password) => {
  try {
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

/**
 * Signs in existing user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export const signInWithEmail = async (email, password) => {
  try {
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

/**
 * Signs in user with Google authentication
 * @returns {Promise<{success: boolean, user?: User, error?: Error}>}
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Logged in with Google:", result.user);
    return { success: true, user: result.user };
  } catch (error) {
    console.error("Error logging in with Google:", error);
    return { success: false, error };
  }
};
