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
		//* get movies [types]
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
		//* get Movie Details
		getMovieDetails: builder.query({
			query: id =>
				`movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
		}),
		// get recommendation movies
		getRecommendationsMovies: builder.query({
			query:
				movie_id => `movie/${movie_id}/recommendations?api_key=${tmdbApiKey}
			`,
		}),
		// get user specific list  "list name" =>favorite/movies
		getList: builder.query({
			query: ({
				accountId,
				listName,
				sessionId,
				page,
			}) => `account/${accountId}/${listName}?session_id=${sessionId}&page=${page}&api_key=${tmdbApiKey}
			`,
		}),
		// get actor details
		getActorDetails: builder.query({
			query: person_id => `person/${person_id}?api_key=${tmdbApiKey}`,
		}),
		// get movies by actor id
		getMovieByActorId: builder.query({
			query: ({ actor_id, page }) =>
				`discover/movie?with_cast=${actor_id}&page=${page}&api_key=${tmdbApiKey}`,
		}),
	}),
});

export const {
	useGetGenresQuery,
	useGetMoviesQuery,
	useGetMovieDetailsQuery,
	useGetActorDetailsQuery,
	useGetMovieByActorIdQuery,
	useGetRecommendationsMoviesQuery,
	useGetListQuery,
} = tmdbApi;
export default tmdbApi;
