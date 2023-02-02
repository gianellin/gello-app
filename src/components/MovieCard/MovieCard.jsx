import React, { useState } from 'react';
import { Card, Icon, Image, Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


function MovieCard({ movie, isProfile, addLike, removeLike, deleteMovie, loggedUser }) {

  const likedIndex = movie.likes.findIndex(
    (like) => like.username === loggedUser.username);
  
  const likeColor = likedIndex > -1 ?'red' : 'grey';
  const clickHandler = likedIndex > -1 ? () => 
        removeLike(movie.likes[likedIndex]._id) : () => addLike(movie._id)


  return (
    <Card key={movie._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${movie.user.username}`}>
              <Image
                size="large"
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

      <Image src={`${movie?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{movie.title}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler}/>
        {movie.likes.length} Likes
      </Card.Content>
    </Card>
  );
}

export default MovieCard;


