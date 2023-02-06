import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Modal, Image, List, ListItem, ListItemText, Icon, Button, DeleteIcon } from "semantic-ui-react";

export default function MovieList( movie, isProfile, addLike, removeLike, loggedUser){

    const likedIndex = movie.likes.findIndex(
        like => like.username === loggedUser.username);
      
      const likeColor = likedIndex > -1 ?'green' : 'grey';
      const clickHandler = likedIndex > -1 ? () => 
            removeLike(movie.likes[likedIndex]._id) : () => addLike(movie._id);

    function handleDelete() {
        setMovies(movies.filter((el) => el.id !== movie.id));
    }

   return ( 
    <Card>
    <List>
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

            <Image src={`${movie?.photoUrl}`} wrapped ui={false}/>
                <Card.Content>
                <Card.Description>{movie.title}    <br></br><Button className="btn" type="submit" href="/:id" > 
                     <Icon name="angle double right"></Icon>        
                    </Button></Card.Description>
                </Card.Content>
                    <Card.Content extra textAlign="left" >
       
                    <Button className="btn" type="submit" onClick={handleDeleteMovie}> - </Button>
        <Icon  name={"heart"} size="large" color={likeColor} onClick={clickHandler}/>
        {movie.likes.length} Likes
        </Card.Content>
        <ListItem
            secondaryAction={
                <IconButton aria-label="delete-movie" edge="end" onClick={handleDelete} >
                    <DeleteIcon/>
                </IconButton>
            }>
                {title}
            <ListItemText/>
        </ListItem>
    </List>
    </Card>
    );
}

