import gql  from "graphql-tag"
// import { app } from "realm-web"

// export const updateTitleUrlMongo = url => {
// app.
// }

export const UPDATE_TITLE_URL = gql`
mutation UpdateTitleRecord ($titleMBID: String!, $url: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID},
    set: { url: $url}
    # skip: !$titleMBID
    ){
      titleName
      url
      
  }
}
`

export const UPDATE_GENRES = gql`
mutation UpdateTitleRecordGenres ($titleMBID: String!,$fieldValue: [String!]){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { genres: $fieldValue}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
export const UPDATE_INSTRUMENTS = gql`
mutation UpdateTitleRecord ($titleMBID: String!,$fieldValue: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { instruments:{ soloInstr:[ $fieldValue]}}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
