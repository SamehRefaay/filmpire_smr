import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

const tmdbApi = createApi({
	reducerPath: 'tmdbApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
	endpoints: builder => ({
		//* get genres
		getGenres: builder.query({
			query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
		}),
		//* get movies
		getMovies: builder.query({
			query: ({ genreIdOrCategoryName, page, searchQuery }) => {
				//* Get Movies By Search
				if (searchQuery) {
					return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
				}
				//* Get Movies By Category Name
				if (
					genreIdOrCategoryName &&
					typeof genreIdOrCategoryName === 'string'
				) {
					return `movie/${genreIdOrCategoryName.replace(
						/-/g,
						'_'
					)}?page=${page}&api_key=${tmdbApiKey}`;
				}
				//* Get Movies By Genre Id
				if (
					genreIdOrCategoryName &&
					typeof genreIdOrCategoryName === 'number'
				) {
					return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
				}
				//* Get Popular Movies as default
				return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
			},
		}),
	}),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
export default tmdbApi;
