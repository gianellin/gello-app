import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import MovieDisplay from "../../components/MovieDisplay/MovieDisplay";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import userService from "../../utils/userService";
import * as likesAPI from "../../utils/likeApi";

function ProfilePage({ loggedUser, handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { username } = useParams(); // { username} matches the the route in your App.js <route path='/:username'>

  console.log("username in Profile page -> ", username);

  //delete movie from profile
  
  async function deleteMovie(movieId) {
    try {
        const response = await movieAPI.deleteMovie(movieId);
        getMovies();

    } catch(err){
        console.log(err.message, 'error in deleting movie')
        setError('error deleting movie -> try again')
    }
}

  async function addLike(movieId) {
    // postId exists in the card component
    try {
      const response = await likesAPI.create(movieId);
      console.log(response, " response from likes APi");
      // update the cards with likes array
      getProfile(); // getProfile updates our state, so we'll see a change in the UI, heart will go to red
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
      getProfile(); // getProfile updates our state, so we'll see a change in the UI, heart will go to grey
    } catch (err) {
      console.log(err.message, " remove like");
    }
  }

  async function getProfile() {
    try {
      // making the API CALL
     
      const response = await userService.getProfile(username);

      setLoading(false); // set loading to false
      setMovies(response.movies);
      setProfileUser(response.user);
      console.log(response, " <- data is getprofile");
    } catch (err) {
      console.log(
        err.message,
        " error in getProfile something went wrong with the getProfile api request, check server terminal"
      );
      setLoading(false);
      setError("Profile does not exist"); // <- this is what we show
      // on the page
    }
  }

  useEffect(() => {
    getProfile();
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
        <Loader />
      </>
    );
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column >
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>

        <MovieDisplay
            movies={movies}
            numPhotosCol={4}
            isProfile={true}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            loggedUser={loggedUser}
            deleteMovie={deleteMovie}
          
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfilePage;
