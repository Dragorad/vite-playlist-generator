// Mock auth service for testing without Firebase
export const app = {
  currentUser: {
    id: 'mock-user',
    isLoggedIn: true
  }
};

export const loginAnonymous = async () => {
  console.log('Mock anonymous login');
  return { id: 'mock-user', isLoggedIn: true };
};

export const loginWithEmail = async (email, password) => {
  console.log('Mock email login:', email);
  return { id: 'mock-user', email, isLoggedIn: true };
};

export const loginWithGoogle = async () => {
  console.log('Mock Google login');
  return { id: 'mock-user', isLoggedIn: true };
};