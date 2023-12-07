import {useState} from 'react'
import { TextField, Typography } from '@mui/material'
import { notify } from 'react-notify-toast';


// props - nameStr   updateMutation

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
}
// https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript


function splitMulti(str, tokens) {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}
export function UpdateFieldForm(props) {
    const { nameStr, titleMBID } = props
    const getNewGenresArr = (nameStr, props) => {
        if (nameStr === "Genres") {
            // console.log(props.oldGenres)
            const MBGenres = Array.isArray(props.MBGenres) ? props.MBGenres : []

            // https://stackoverflow.com/questions/35235794/filter-strings-in-array-based-on-content

            // var textToSearch = 'bedroom';
            // var filteredArray = myArray.filter((str)=>{
            //   return str.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0; 
            // });
            const excludeString = 'object'
            const oldGenres = props.oldGenres.filter(el => {
                const substrIdx = el.toLowerCase().indexOf(excludeString.toLowerCase())
                if (substrIdx < 0) return el

            })


            const newGenresArr0 = MBGenres.concat(oldGenres)
            const newGenresArr = Array.from(new Set(newGenresArr0))
            return newGenresArr
        }
    }

    const newGenresArr = props.oldGenres == undefined ? [] : getNewGenresArr(nameStr, props)
    const litNameStr = '${nameStr}'
    const [valueStr, setValueStr] = useState('')
    const h4String = (`Handle ${nameStr}`).toUpperCase()
    const submFunction = props.onSubmit

    return (
        <form key={`${titleMBID}-${nameStr}`} style={formStyles}
            onSubmit={(e) => {
                e.preventDefault()
                const splitters = ['/', ', ', '-', ' ']
                const valuesArr = nameStr === "Genres" ? newGenresArr : []

                console.log(nameStr + ' : ' + valueStr)
                valuesArr.push(valueStr)

                // get unique values from stackoverflow

                let newValuesArr = [...new Set(splitMulti(valuesArr.join(', '), splitters)
                    .map(el => el.trim()).filter(elem => elem !== ''))]
                const updateObj = { titleMBID: titleMBID, valuesArr: newValuesArr }
                console.log(updateObj)
                props.onSubmit(updateObj)
                    .then(result => {
                        console.log(result)
                        //     const { genres, tags } = result
                    }).catch(error => {
                        notify.show(error.message, "error")
                        console.log(error.message)
                    })
                // handleUpdateGenres(valueStr)

                // h4String = " field updated"
                // setUrlString('')
            }}>
            <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography>
            <TextField id={nameStr} label={nameStr} name={nameStr}
                value={valueStr} placeholder={nameStr}
                onChange={event => {
                    event.preventDefault()
                    let newValueStr = event.target.value
                    // console.log(newValueStr)
                    setValueStr(newValueStr)
                }}
                value={valueStr}
                // required={true}
                variant={'outlined'}
                helperText={`Set ${nameStr}`}
            />
            <button type="submit">{`update ${nameStr}`}</button>
        </form>
    )
}