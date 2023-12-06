import { gql } from "apollo-boost"

export const UPDATE_TITLE_URL = gql`
mutation UpdateTitleRecord ($titleMBID: String!, $url: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { url: $url}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
// export function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

// const randomBpm = getRandomInt(120)


export const GET_FIVE = gql`
query getFiveRecords( $randomBpm: Int){
    title_records(
        query: {bpm_gte: $randomBpm} 
        sortBy: CHORDS_KEY_ASC 
        limit:5
        ) {
      _id
      bpm
      titleName
      artist
      url
    }
  }
`
// export function TitlesArtistQuery() {
//     const { loading, error, data } = useQuery(GET_FIVE)
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(
//     {error.message} </p>
//     return (
//         data.map
//     )
export const demoUrls = [
    'https://youtu.be/1hzc8Do6Ius',
    'https://youtu.be/oDdOYyGa41Q',
    'https://youtu.be/DH7l880a-4M',
    'https://youtu.be/e0ZF7FsiFE0',
    // 'https://youtu.be/YCNCdcFJSkg',
]