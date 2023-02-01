const Movie = require('../models/movie');

module.exports = {
	create,
	index,
	//delete: deleteMovie,
	//update,
	
};

async function create(req, res) {
	try {
		newMovie = await new Movie({
			movieTitle: req.body.movieTitle,
			tmdbId: req.body.tmdbId,
			movieReleaseYear: req.body.movieReleaseYear,
			movieDirector: req.body.movieDirector,
			moviePlotSummary: req.body.moviePlotSummary,
			moviePosterUrl: req.body.moviePosterUrl,
			watchedStatus: req.body.watchedStatus,
			wantToWatchStatus: req.body.wantToWatchStatus,
			userDateWatched: req.body.userDateWatched,
			userRating: req.body.userRating,
			userId: req.body.userId
		});
		newMovie.save(function(err, movie) {
			console.log(movie);
		});
		res.status(201).json(newMovie);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function index(req, res) {
	try {
		movies = await Movie.find({ userId: req.user._id });
		res.status(200).json(movies);
	} catch (err) {
		res.status(400).json(err);
	}
}


// async function deleteMovie(req, res) {

// }

// async function update(req, res) {

// }
