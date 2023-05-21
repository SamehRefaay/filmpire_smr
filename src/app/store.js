import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import tmdbApi from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import authReducer from '../features/authentication';

export default configureStore({
	reducer: {
		[tmdbApi.reducerPath]: tmdbApi.reducer,
		currentGenreOrCategory: genreOrCategoryReducer,
		authentication: authReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(tmdbApi.middleware),
});
