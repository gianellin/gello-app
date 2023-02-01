
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { useNavigate } from "react-router-dom";
// Since we want to make a request as a user about a user
// we need to import the userService
import React from 'react';
import MovieDetailForm from '../../components/MovieDetailForm/MovieDetailForm';
import MovieDetailInfo from '../../components/MovieDetailInfo/MovieDetailInfo';


const MovieDetailPage = (props) => {
	return (
		<Main>
			<section>
				<MovieDetailInfo currentMovie={props.currentMovie} />
				<MovieDetailForm
					user={props.user}
					currentMovie={props.currentMovie}
					handleMovieDetailSubmit={props.handleMovieDetailSubmit}
					handleMovieDetailUpdate={props.handleMovieDetailUpdate}
				/>
			</section>
		</Main>
	);
};

export default MovieDetailPage;
