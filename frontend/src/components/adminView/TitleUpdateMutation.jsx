import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'


export default function AddTitleURL( props) {
    const TITLE_RECORD = gql`
  query GetTitleRecord ($titleMBID: String){
    title_record(query: {titleMBID: $titleMBID}) {
    _id
    artist
    titleName
    chords_key
    url
    bpm
    titleMBID
    }
  }
`
    const UPDATE_TITLE = gql`
mutation UpdateTitleRecord ($titleMBID: String!, $url: String!){
   updateOneTitle_record(
       query: {titleMBID: $titleMBID}, 
    #    skip: !$titleMBID},
       set: { "url": $url}){
        titleName
        url
    }
}
`

    const { loading, error, data: record } = useQuery(TITLE_RECORD)
    const [updateTitleRecord] = useMutation(UPDATE_TITLE)
    const handleUpdateTitleURL = ({titleMBID, url}) => updateTitleRecord(
        {
            variables: {
                titleMBID: titleMBID,
                url: url
            }
        }
    )
    return (
        <div>
            <p> {props}</p>
            {loading && <div>loading</div>}
            {error && <div>{`encountered an error: ${error.message}`}</div>}
            {record && <div>{` fetched: artist ${record.title_record.artist} : title
            ${record.title_record.titleName} `}
                <p>{record.title_record.titleMBID}</p></div>}
            <button onClick={handleUpdateTitleURL}>Update Title url</button>
            {/* <form
                onSubmit={e => {
                    e.preventDefault();
                    handleUpdateTitleURL({ variables: { url: input.value } });
                    input.value = '';
                }}>
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Update Update Title URL</button>
            </form> */}
        </div>
    )
}