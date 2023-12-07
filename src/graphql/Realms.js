
import * as RealmWeb from 'realm-web'

const app = new RealmWeb.App({ id: "dragoraselectortest-sveyc" })


// Create an anonymous credential
const credentials = RealmWeb.Credentials.anonymous();
try {
    // Authenticate the user
    app.logIn(credentials).then(
        user => {
            user = { ...user, id: app.currentUser.id }
            return user
        }
    )
    // `App.currentUser` updates to match the logged in user
} catch (err) {
    console.error("Failed to log in", err)
}


const customQueryObj = { bpm: 140, delta: 30 }

export async function generatePlaylist(queryObj) {
   const playList = await app.functions.generatePlaylist(queryObj)
   return playList 
}

export const playList = generatePlaylist(customQueryObj)


console.log(playList)



//     // const mongodb = context.services.get("mongodb-atlas");
//     const titleRecords = mongodb.db("Dragora_Selector").collection("title_records");
//     let min = bpm - delta
//     let max = bpm + delta

//     const query = {
//         $match: {
//             $and: [
//                 { "bpm": { $gte: min, $lte: max } },
//             ]
//         }
//     }
//     const sample = { $sample: { size: 5 } }
//     const project = { $project: { titleName: 1, artist: 1, bpm: 1, url: 1, _id: 0 } }

//     const result = titleRecords.aggregate([query, sample, project])

//     return result
// }