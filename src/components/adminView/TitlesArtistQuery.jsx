// import {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
// import { TextField, Typography } from '@mui/material'
import UrlTitleForm from './UrlTitleForm'
import Notifications from 'react-notify-toast'

const TITLE_DATA = gql`
  query GetTitleData {
    title_records
    (
      query: {url_exists: false} 
      sortBy: ARTIST_ASC)
     {
    _id
     artist
    titleName
    chords_key
    titleMBID
    bpm
    url
    genres
    tags{
      genre
      }}}
`
export const TITLE_RECORD = gql`
query GetTitleRecord ($titleMBID: String){
  title_record(query: {titleMBID: $titleMBID}) {
    _id
     artist
    titleName
    chords_key
    titleMBID
    bpm
    url
    genres
    tags{
      genre
      }}}
`
export const UPDATE_TITLE_GENRES = gql`
mutation updateOneTitle_record ($titleMBID: String!, $genres:[String]){
  updateOneTitle_record
  (query: {titleMBID: $titleMBID}
    set:{genres: $genres})  {
    _id
     artist
    titleName
    chords_key
    titleMBID
    bpm
    url
    genres
    tags{
      genre
      }}}
`

// const UPDATE_TITLE = gql`
// mutation UpdateTitleRecord ($titleMBID: String!, $url: String!){
//  updateOneTitle_record(
//     query: {titleMBID: $titleMBID}
//     set: { url: $url}
//     # skip: !$titleMBID
//     ){
//       titleName
//       url
//   }
// }
// `

export function TitlesArtistQuery() {
  const { loading, error, data } = useQuery(TITLE_DATA)
  // const { mutation_loading, mutation_error, mutation_data, refetch } = useMutation(UPDATE_TITLE_GENRES)
  // const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE, {
  //   variables: { titleMBID: 'data.titleMBID' },
  //   skip: data == null
  // })

  // const [url, setUrl] = useState(null)
  // const handleChange = (event) => {
  //   setUrl(event.target.value);
  // }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( from TitleArtist Query {error.message} </p>

  console.log(data.title_records.length)
  let data1 = data.title_records.slice(0, 20)
  // .filter(elem => elem.bpm > 149)
  // filter(el => el.url == undefined)

  console.log(data1)
  return (
    data1.map(({ _id, artist, titleName, bpm, chords_key, titleMBID, url, genres, tags }) => (
      <div key={`title-data${_id}`} style={{
        display: 'flex', flexDirection: 'column', paddingLeft: '3%',
        borderBottom: '1px solid gray', maxWidth: '600 px'
      }}>
        <Notifications />
        <p style={{ "color": "blue" }}>
          {artist}: {titleName}
          <p style={{ "color": "red" }} >
            :: chords_key {chords_key} - bpm {bpm}
          </p>
          <p style={{ color: "darkblue" }} id={titleMBID}>
            titleMBID: {titleMBID} <br />
            titleURL: {url}  <br />
            MBGenres: {tags.genre ? "no tags defined" : tags.genre} <br />
            genres: {genres === null ? 'no genres yet' : genres.join('; ')} </p>
        </p>
        <div style={{ color: " rgb(115, 41, 41)", display: 'flex', alignItems: 'space-between' }}>
          {/* {url != null ? <iframe width="180"
            src={`https://www.youtube.com/embed/${url}`}>
          </iframe>
            : <p>No url provided </p>} */}
          <UrlTitleForm titleMBID={titleMBID}
            MBGenres={tags.genre}
            oldGenres={!genres ? [] : genres}
            url={url}
            key={_id + titleMBID} />

        </div>
      </div>
    ))
  )
}
