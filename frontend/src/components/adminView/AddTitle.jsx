
import babytube from 'babytube'




// import youtubeApi from '../apis/youtube'; 
// import { extractDescriptors } from 'essentia-extractor-js';
const [title, setTitle] = useState('');
const [youtubeUrl, setYoutubeUrl] = useState('');


const handleSubmit = async () => {

  // Get video title from YouTube API
  const audio =  babytube.musicDownload(youtubeUrl);
  const videoData = await babytube.getData(youtubeUrl);
  // Extract audio and descriptors
  
//   const descriptors = await extractDescriptors(audio);

  // Save title to database
//   await database.addTitle({
//     title: videoTitle,
//     youtubeUrl,
//     descriptors
//   });

//   setTitle('');
//   setYoutubeUrl('');

}
<form onSubmit={handleSubmit}>
  <input 
    value={title}
    onChange={e => setTitle(e.target.value)} 
  />

  <input
   value={youtubeUrl}
   onChange={e => setYoutubeUrl(e.target.value)}
  />

  <button type="submit">Add Title</button>
</form>
