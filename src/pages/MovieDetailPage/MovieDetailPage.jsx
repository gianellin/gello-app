import React from 'react';
import styled from 'styled-components';

import MovieDetailForm from '../../components/MovieDetailForm/MovieDetailForm';
import MovieDetailInfo from '../../components/MovieDetailInfo/MovieDetailInfo';

const Main = styled.main`
	height: 100vh;
	background: black;
	display: flex;
	justify-content: center;
	align-items: center;
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 90vw;
		border: 5px solid ${(props) => props.theme.pulsarPurple};
		border-radius: 10px;
	}
`;

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
