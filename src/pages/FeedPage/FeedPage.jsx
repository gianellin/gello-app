import PageHeader from "../../components/PageHeader/PageHeader";
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import Loader from "../../components/Loader/Loader";

import { useState, useEffect } from "react";

// import { create } from '../../utils/postApi'
import * as moviesAPI from "../../utils/movieApi";
import * as likesAPI from "../../utils/likeApi";



import { Grid } from "semantic-ui-react";

// think of your pages as containers
// that store your logic!
function FeedPage({loggedUser, handleLogout}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function addLike(postId) {
    // postId exists in the card component
    try {
      const response = await likesAPI.create(movieId);
      console.log(response, " response from likes APi");
      // update the cards with likes array
      getMovies();// getmovies updates our state, so we'll see a change in the UI, heart will go to red
    } catch (err) {
      console.log(err.message, " add like");
    }
  }

  async function removeLike(likeId) {
    // postId exists in the card component
    try {
      const response = await likesAPI.deleteLike(likeId);
      console.log(response, " response from likes APi");
      // update the cards with likes array
      getMovies();// getmovies updates our state, so we'll see a change in the UI, heart will go to grey
    } catch (err) {
      console.log(err.message, " remove like");
    }
  }

  // Why?
  // Creating a POST (C)RUD
  // cuz we want to update state whenever we change a POST CRUD operations*
  async function handleAddMovie(movie) {
    // post, is coming from the addPostForm component, when we call this function onSubmit props.handleAddPost(formData)
    try {
      // this is where we will make the api call to our server
      // because we'll get the response and then we can update state to reflect that change
      // like adding a new post
      setLoading(true);
      const response = await moviesAPI.create(movie); // waiting for the json to be return from the server and parsed by us!

      // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create postAPI utils function
      console.log(response, " handle add post");
      setMovies([response.movie, ...movies]); /// ...movies would keep all the movies in the previous states array
      setLoading(false);
    } catch (err) {
      // this is the error from the throw block, in the moviesAPI.create function
      console.log(err.message, "error in addMovie");
      setError("Error creating movie, please try again");
    }
  }

  async function getMovies() {
    try {
      const response = await moviesAPI.getAll();
      console.log(response, " data");
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error in getMovies");
      setLoading(false);
    }
  }

  useEffect(() => {
    //Getting movies, C(R)UD

    getMovies();
  }, []); // This is useEffect runs once when the Feed component
  // loads

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddMovieForm handleAddMovie={handleAddMovie} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <MovieDisplay
            movies={movies}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
