// import React, { useState, useEffect } from "react";
// import PageHeader from "../../components/PageHeader/PageHeader";
// import AddMovieForm from "../../components/AddMovieForm/AddMovieForm";

// import Loader from "../../components/Loader/Loader"
// import { Grid } from "semantic-ui-react";

// //importing the utils
// import * as moviesAPI from "../../utils/movieApi";
// import * as likesAPI from "../../utils/likeApi";

// export default function AddMoviePage({loggedUser, handleLogout}) {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   async function addLike(movieId) {
//     try {
//       const response = await likesAPI.create(movieId);
//       console.log(response, " response from likes APi");
//       getMovies();
//     } catch (err) {
//       console.log(err.message, " add like");
//     }
//   }


//   async function handleAddMovie(movie) {
//     try {
//       setLoading(true);
//       const response = await moviesAPI.create(movie); 
//       console.log(response, " handle add movie");
//       setMovies([response.movie, ...movies]); 
//       setLoading(false);
//     } catch (err) {
      
//       console.log(err.message, "error in adding movie");
//       setError("Error movie card not created");
//     }
//   }

//   async function getMovies() {
//     try {
//       const response = await moviesAPI.getAll();
//       console.log(response, " data");
//       setMovies(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err.message, " this is the error in getMovies");
//       setLoading(false);
//     }
//   }
  
//   useEffect(() => {
//     getMovies();
//   }, []); 

//   if (error) {
//     return (
//       <>
//         <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
//         <ErrorMessage error={error} />;
//       </>
//     );
//   }
//   if (loading) {
//     return (
//       <>
//         <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
//         <Loader />;
//       </>
//     );
//   }

//   return (

   
//     <Grid centered   textAlign="center"
//         style={{ height: "130vh", width: "100vw" }}
//         verticalAlign="middle">
//       <Grid.Row>
//         <Grid.Column as="h1" textAlign="center" >
//         <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
//         </Grid.Column>
//       </Grid.Row>
//       <AddMovieForm handleAddMovie={handleAddMovie} />
//       <Grid.Row>
//         <Grid.Column style={{ maxWidth: 400 }}>
          
//         </Grid.Column>
//       </Grid.Row>
     
//     </Grid>
    
//   );
// }

