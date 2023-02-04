import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";
import AddMovie from "../../components/AddMovieForm/AddMovie";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import Loader from "../../components/Loader/Loader"
import { Grid } from "semantic-ui-react";
import "./FeedPage.css";
//importing the utils
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
      setMovies([response.movie, ...movies]); 
      setLoading(false);
    } catch (err) {
      
      console.log(err.message, "error in adding movie");
      setError("Error movie card not created");
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
  }, []); 

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        <ErrorMessage error={error} />;
      </>
    );
  }
  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        <Loader />;
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
          {/* <AddMovie /> */}
          <AddMovieForm handleAddMovie={handleAddMovie} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 1200 }}>
          
          <MovieDisplay
            movies={movies}
            numPhotosCol={4}
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
