// import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import { TextField, Typography, Divider } from '@mui/material'
import { UpdateFieldForm } from './UpdateFieldForm'
// import { UPDATE_TITLE_URL } from '../../graphql/Mutations'
import { setTitleUrl, setTitleGenres, setTitleInstruments } from '../../index'
import { notify } from 'react-notify-toast'


export default function UrlTitleForm(props) {

  // const titleMBID = props.titleMBID
  const { titleMBID, oldGenres, genres } = props
  // const updatedUrl = props.url
  const [urlString, setUrlString] = useState('')
  const [updatedUrl, setUpdatedUrl] = useState(props.url)
  // const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE_URL)
  console.log(oldGenres)
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
  }
  const handleChange = (event) => {
    const { value } = event.target
    setUrlString(value.substring(17))
  }
  const onUrlSubmit = async (e) => {
    e.preventDefault()
    const variableObj = {
      titleMBID: titleMBID,
      url: urlString
    }
    console.log(variableObj)
    // handleUpdateTitleRecordURL(urlString)
    setTitleUrl(variableObj)
      .then(result => {
        const newUrl = result[0].url
        notify.show(`Title url is https://youtu.be/${newUrl} now`, 'success')
        console.log(newUrl)
        // h4String[0] += " url updated"
        // // url = newUrl
        setUpdatedUrl(newUrl)
      }).catch(error => {
        notify.show(error.message, "error")
        console.log(error.message)
      })
  }


  let h4String = ['Handle Title URL', 'Handle Genres']
  return (
    <>
      {updatedUrl != null ? <iframe width="180"
        title={props.url}
        src={`https://www.youtube.com/embed/${props.url}`}>
      </iframe>
        : <p>No url provided </p>}

      <div style={{
        display: 'flex', maxWidth: '1200 px',
        flexDirection: 'row', justifyItems: 'space-evently'
      }}>
        <form key={titleMBID + 'url'} style={formStyles}
        >
          <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String[0]}</Typography>
          <TextField id={`${titleMBID}url-input`} label="url" name='url'
            value={urlString} placeholder={urlString}
            onChange={handleChange}
            // required={true}
            variant={'outlined'}
            helperText="You Tube url"
          />
          <button type="submit" onClick={onUrlSubmit}
          >Update Title URL</button>
        </form>
        {/* <ItemsList arr={genresList} title='Genres' /> */}

        <UpdateFieldForm nameStr='Genres' style={formStyles}
          titleMBID={titleMBID}
          MBGenres={props.MBGenres}
          oldGenres={props.oldGenres}
          onSubmit={setTitleGenres} />
        <Divider orientation='vertical' />
        <div style={{ display: 'flex', padding: '1%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {['instruments solo', 'instruments oblig'].map(nameStr =>
              <UpdateFieldForm
                onSubmit={setTitleInstruments}
                titleMBID={titleMBID}
                nameStr={nameStr}
                styles={formStyles} />)}
          </div>
        </div >
        {/* <ItemsList arr={instrumentsList} title='Instruments' /> */}

      </div >
    </>
  )
}
