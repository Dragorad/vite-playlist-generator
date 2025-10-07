const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const getNewPlayList = async (inputObj) => {
  const response = await fetch(`${API_BASE_URL}/playlists/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputObj)
  });
  return response.json();
};

export const setTitleUrl = async (urlObj) => {
  const response = await fetch(`${API_BASE_URL}/titles/url`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(urlObj)
  });
  return response.json();
};

export const setTitleGenres = async (genreObj) => {
  const response = await fetch(`${API_BASE_URL}/titles/genres`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(genreObj)
  });
  return response.json();
};

export const setTitleInstruments = async (instrumObj) => {
  const response = await fetch(`${API_BASE_URL}/titles/instruments`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(instrumObj)
  });
  return response.json();
};