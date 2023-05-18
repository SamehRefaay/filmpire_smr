import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import tmdbApi from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
	reducer: {
		[tmdbApi.reducerPath]: tmdbApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tmdbApi.middleware),
});
