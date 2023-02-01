import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema(
	{
		tmdbId: {
			type: Number
		},
		movieReleaseYear: {
			type: String
		},
		movieDirector: {
			type: String
		},
		moviePlotSummary: {
			type: String
		},
		moviePosterUrl: {
			type: String
		},
		watchedStatus: {
			type: Boolean
		},
		wantToWatchStatus: {
			type: Boolean
		},
		userDateWatched: {
			type: Date
		},
		userRating: {
			type: Number,
			min: 1,
			max: 100
		},
		userId: {
			type: String
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
