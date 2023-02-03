
import React, { useEffect, useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddMovie({handleSubmit}) {
    // states - input query, movies
  const [title, setTitle] = useState("");
  const [movieInfo, setMovieInfo] = useState([]);




  // states - input query=title, movies

 useEffect(() => {
    console.log("use Effect is good to go");
    
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=b6595c31be2a675dec9d16dab4b7d4d8&language=en-US&query=${title}&page=1&include_adult=false`;

    async function makeApiCall() {
      try {
        // this is fetching the JSON and shows up as "Response" in the console
        const res= await fetch(movieUrl);
        // this is changes response into JS object called data thats workable--> parsing it?
        const data = await res.json();
        console.log(data);

        // this is getting the 2nd index in the data array of the api, but how do i get it to display??
        setMovieInfo(data.results);
        console.log(data.results)
      } catch (err) {
        console.log(err);
      }
    }
    makeApiCall();
  },  []);

  function handleChange(e) {
    setTitle(e.target.value);
    //update the "title=query" state with that value
  }

  function handleSubmit(e) {
    e.preventDefault();
  

  }

  return (
    <Segment>
        <Form onSubmit={handleSubmit}>
            <Form.Input
                type="text"
                name="title"
                placeholder="What is the movie title?"
                value={title}
                onChange={handleChange}
                required
            />
            <Button type="submit" className="btn">
                Search
            </Button>
        </Form>
    </Segment>
  );
}

export default AddMovie;



    
  
   

  
   
  