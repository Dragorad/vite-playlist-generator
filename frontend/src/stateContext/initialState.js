import { genresList } from '../workers/genresAndInstrumentsList'
// import { descriptorsList } from '../workers/descriptorsList'
// import { app } from '../index'
// import { firstPlaylist } from '../index'
import * as playLists from './preDefinedPlaylists'

// const initalPlaylist = firstPlaylist

const genresFilterList = genresList.join(' ').split(' ')
  .filter(elem => elem !== "and")


// export const getNewPlayList = async () => {
//   const playlist = await app.functions.generatePlaylist({ bpm: 169, delta: 20 })
//   console.log(playlist)
//   return playlist
// }

export const initialState = {
  userId: '',
  userName:'',
  playListParams: {
    Brightness: 30,
    Loudness: 10,
    Tempo: 20,
    Diversity: 20,
    diversityStrings: [],
    genresStrings: [],
    bpm: 120
  },
  genresArr: [],
  descriptorsArr: ['Tempo', 'Brightness', 'Loudness'],
  alertOpen: false,
  sliderFormValues: {
    genresList: genresFilterList,
    Brightness: 35,
    Loudness: 10,
    Tempo: 40
  },
  diversity: {
    value: 30,
    params: []
  },
  urlIdx: 0,
  playing: true,
  playlist: playLists.playList6
}
