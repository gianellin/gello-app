import React, { useState } from 'react';
import { Card, Icon, Image, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


function MovieCard({ movie, isProfile, addLike, removeLike, deleteMovie, loggedUser }) {

  const likedIndex = movie.likes.findIndex(
    like => like.username === loggedUser.username);
  
  const likeColor = likedIndex > -1 ?'green' : 'red';
  const clickHandler = likedIndex > -1 ? () => 
        removeLike(movie.likes[likedIndex]._id) : () => addLike(movie._id);

  // const handleDeleteMovie =  () => deleteMovie(movie._id)

  return (
    <Card key={movie._id} raised>
      {isProfile ? (
        ""
      ) : (
       
      
        <Card.Content textAlign="left">
         
          <Card.Header>
            <Link to={`/${movie.user.username}`}>
              <Image
                size="small"
                avatar
                src={
                  movie.user.photoUrl
                    ? movie.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {movie.user.username}
            </Link>
          </Card.Header>
        </Card.Content>

      )}

      <Image src={`${movie?.photoUrl}`} wrapped ui={false}/>
      <Card.Content>
        <Card.Description>{movie.title}    
        {/* <br></br><Button className="btn" type="submit" href="/:id" > 
          <Icon name="angle double right"></Icon>        
        </Button> */}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="left" >
       
      {/* <Button className="btn" type="submit" onClick={handleDeleteMovie}> - </Button> */}
        <Icon  name={"eye"} size="large" color={likeColor} onClick={clickHandler}/>
        {movie.likes.length} Watched
        
      </Card.Content>
    </Card>
  );
}

export default MovieCard;


