
import { useEffect, useState } from "react";

export default function Form({ liftMovieTitle }) {
  const [title, setTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    console.log("use Effect is good to go");
    
    const movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=b6595c31be2a675dec9d16dab4b7d4d8`;

    async function makeApiCall() {
      try {
        // this is fetching the JSON and shows up as "Response" in the console
        const responseJson = await fetch(movieUrl);
        console.log(responseJson);

        // this is changes response into JS object called data thats workable--> parsing it?
        const data = await responseJson.json();
        console.log(data);

        // this is getting the 2nd index in the data array of the api, but how do i get it to display??
        setMovieInfo();
      } catch (err) {
        console.log(err);
      }
    }
    makeApiCall();
  },  []);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  

  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="search MOVIE"
        onChange={handleChange}
        value={title}
      />
      <button type="submit">Search</button>
    </form>
  );
}



    
  
   

  
   
  