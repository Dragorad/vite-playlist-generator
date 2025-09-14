import * as RealmWeb from "realm-web";
import { APP_ID } from '../credential/AppId';

export const app = new RealmWeb.App({
  id: APP_ID,
  baseUrl: "https://services.cloud.mongodb.com"
});

console.log('🔗 Atlas App ID:', APP_ID);
console.log('📋 ENV Variable:', import.meta.env.VITE_REALM_APP_ID);



export const loginAnonymous = async () => {
  const credentials = RealmWeb.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    console.log('Logged anonymous', user.id);
    return user;
  } catch (err) {
    console.error("Failed to log in anonymously", err);
    throw err;
  }
};

export const loginWithEmail = async (email, password) => {
  const credentials = RealmWeb.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (err) {
    console.error("Failed to log in with email", err);
    throw err;
  }
};

export const loginWithGoogle = async () => {
  const credentials = RealmWeb.Credentials.google();
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (err) {
    console.error("Google login failed, falling back to anonymous", err);
    return await loginAnonymous();
  }
};

// Initialize with anonymous login
loginAnonymous().catch(err => console.error("Initial login failed", err));