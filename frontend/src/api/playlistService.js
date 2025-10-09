import { auth } from '../auth/firebaseConfig';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function to get auth headers
const getAuthHeaders = async () => {
  const headers = { 'Content-Type': 'application/json' };
  
  if (auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.warn('Failed to get Firebase token:', error);
    }
  }
  
  return headers;
};

export const getNewPlayList = async (inputObj) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/playlists/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify(inputObj)
  });
  return response.json();
};

export const setTitleUrl = async (urlObj) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/titles/url`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(urlObj)
  });
  return response.json();
};

export const setTitleGenres = async (genreObj) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/titles/genres`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(genreObj)
  });
  return response.json();
};

export const setTitleInstruments = async (instrumObj) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}/titles/instruments`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(instrumObj)
  });
  return response.json();
};