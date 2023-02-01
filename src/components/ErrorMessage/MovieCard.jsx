import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import MovieButtonContainer from '../../components/MovieButtonContainer/MovieButtonContainer';

const Div = styled.div`
	color: white;
	width: 95%;
	margin: 20px;
	background: black;
	display: flex;
	flex-direction: row;
	border-left: solid 10px ${(props) => props.getStatusColor(props.movie)};
	.rating {
	
	}
	.ratingContainer {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: auto;
	}
	.badge-pill {
		border-radius: 8px;
		padding: 2px 5px;
		background: ${(props) // watched status
	}
	@media (max-width: 768px) {
		flex-direction: column;
		height: 20rem;
		img {
			height: 10rem;
		}
		.summary {
			display: none;
		}
	}
`;

const MovieCard = (props) => {
	let getRatingColor = (rating) => {
		if (rating > 90) {
			return '#2bdded';
		} else if (rating > 80) {
			return '#11e996';
		} else if (rating > 70) {
			return '#ebc334';
		}
	};

	let getStatusColor = (movieData) => {
		if (movieData.watchedStatus && !movieData.wantToWatchStatus) {
			return '#11e996';
	
	};

};

