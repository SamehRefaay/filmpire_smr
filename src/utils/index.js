import axios from 'axios';

export const movieApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: process.env.REACT_APP_TMDB_KEY,
	},
});

export const fetchToken = async () => {
	try {
		const { data } = await movieApi.get('/authentication/token/new');
		const token = data.request_token;
		if (data.success) {
			localStorage.setItem('request_token', token);
			window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
		}
	} catch (error) {
		console.log('sorry your token could not be created');
	}
};

export const createSessionId = async () => {
	const token = localStorage.getItem('request_token');
	let sessionId;
	if (token) {
		try {
			const {
				data: { session_id },
			} = await movieApi.post('/authentication/session/new', {
				request_token: token,
			});
			localStorage.setItem('session_id', session_id);
			sessionId = session_id;
		} catch (error) {
			console.log(error);
		}
	}
	return sessionId;
};

// add or remove movie to favorite list
export const addMovieToFavorite = async (
	account_id,
	mediaId,
	isMovieFavorited
) => {
	const session_id = localStorage.getItem('session_id');
	try {
		await movieApi.post(
			`account/${account_id}/favorite?session_id=${session_id}`,
			{
				media_type: 'movie',
				media_id: mediaId,
				favorite: !isMovieFavorited,
			}
		);
	} catch (error) {
		console.log('sorry your movie did not added successfully to Favorite List');
	}
};

// add or remove movie to watchlist list
export const addMovieToWatchlist = async (
	account_id,
	mediaId,
	isMovieWatchListed
) => {
	const session_id = localStorage.getItem('session_id');
	try {
		await movieApi.post(
			`account/${account_id}/watchlist?session_id=${session_id}`,
			{
				media_type: 'movie',
				media_id: mediaId,
				watchlist: !isMovieWatchListed,
			}
		);
	} catch (error) {
		console.log('sorry your movie did not added successfully to watch List');
	}
};
