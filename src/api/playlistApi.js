import { app } from '../auth/authService';

export const getNewPlayList = async (inputObj) => {
  const playlist = await app.currentUser.callFunction('generatePlaylist', inputObj);
  return playlist;
};

export const setTitleUrl = async (urlObj) => {
  const result = await app.currentUser.callFunction('updateTitleUrl', urlObj);
  return result;
};

export const setTitleGenres = async (genreObj) => {
  const result = await app.currentUser.callFunction('updateTitleGenres', genreObj);
  return result;
};

export const setTitleInstruments = async (instrumObj) => {
  const result = await app.currentUser.callFunction('updateTitleInstruments', instrumObj);
  return result;
};