import React, { useState, useEffect } from "react";
import { Grid, Image, Divider } from "semantic-ui-react";
import "./FeedPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import Loader from "../../components/Loader/Loader";
import * as moviesAPI from "../../utils/movieApi";
import * as likesAPI from "../../utils/likeApi";

function FeedPage({loggedUser, handleLogout}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function addLike(movieId) {
    try {
      const response = await likesAPI.create(movieId);
      console.log(response, " response from likes APi");
      getMovies();
    } catch (err) {
      console.log(err.message, " add like");
    }
  }

  async function removeLike(likeId) {
    try {
      const response = await likesAPI.deleteLike(likeId);
      console.log(response, " response from likes APi");
      getMovies();
    } catch (err) {
      console.log(err.message, " error dislike");
    }
  }

  
  async function handleAddMovie(movie) {
    try {
      setLoading(true);
      const response = await moviesAPI.create(movie); 
      console.log(response, " handle add movie");
      setMovies([response.movie, ...movies]); /// ...movies would keep all the movies in the previous states array
      setLoading(false);
    } catch (err) {
      // this is the error from the throw block, in the moviesAPI.create function
      console.log(err.message, "error in adding movie");
      setError("Error movie card not created");
    }
  }
  async function handleDeleteMovie(movieId) {
    try {
        const response = await tripAPI.deleteMovie(movieId);
        console.log(response, ", delete Movie");
        getMovies();
    } catch (err) {
        console.log(err);
        setError("Movie is not deleting");
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

    getMovies();
  }, []); // This is useEffect runs once when the Feed component loads

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
        <Grid.Column style={{ maxWidth: 550 }}>
          <MovieDisplay
            movies={movies}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            deleteMovie={handleDeleteMovie}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
