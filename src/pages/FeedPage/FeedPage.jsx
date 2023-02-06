import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import Loader from "../../components/Loader/Loader"
import { Button, Grid, GridColumn } from "semantic-ui-react";
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
  
  async function deleteMovie(movieId) {
    try {
        const response = await moviesAPI.deleteMovie(movieId);
        getMovies();
    } catch(err){
        console.log(err.message, 'error in deleting movie')
        setError('error deleting movie -> try again')
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
    <Grid centered >
      <Grid.Row>
        <Grid.Column style={{ height: "10vh", width: "100vw" }}
        verticalAlign="middle">
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <br></br>
      {/* <Button type="submit" href="/add" > Add a Movie </Button> */}
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 350 }}>
          {/* <AddMovie /> */}
          <AddMovieForm handleAddMovie={handleAddMovie} />
          
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 750 }}>
          
          <MovieDisplay
            movies={movies}
            numPhotosCol={4}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike} 
            deleteMovie={deleteMovie}
            loggedUser={loggedUser}
          />
        </Grid.Column>

        
      </Grid.Row>
   
    </Grid>
    
  );
}

export default FeedPage;
