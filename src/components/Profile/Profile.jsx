import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Logout } from '@mui/icons-material';
import { authSelector } from '../../features/authentication';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

function Profile() {
	const { user } = useSelector(authSelector);

	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	const { data: favoriteMovies, refetch: favoriteRefetch } = useGetListQuery({
		accountId: user.id,
		listName: 'favorite/movies',
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});

	const { data: watchListMovies, refetch: watchlistRefetch } = useGetListQuery({
		accountId: user.id,
		listName: 'watchlist/movies',
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});

	useEffect(() => {
		favoriteRefetch();
		watchlistRefetch();
	}, []);

	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h4" color="inherit" gutterBottom>
					My Profile
				</Typography>
				<Button
					variant="text"
					color="inherit"
					endIcon={<Logout />}
					onClick={logout}
				>
					Logout
				</Button>
			</Box>
			<Box>
				{!favoriteMovies?.results?.length &&
				!watchListMovies?.results?.length ? (
					<Typography variant="h5" color="inherit">
						Add favorites or watchlist some movies to see them here!
					</Typography>
				) : (
					<Box>
						<RatedCards title="Favorite Movies" data={favoriteMovies} />
						<Divider />
						<RatedCards title="Watchlist" data={watchListMovies} />
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default Profile;
