import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Logout } from '@mui/icons-material';
import useStyles from './styles';
import { authSelector } from '../../features/authentication';

function Profile() {
	const classes = useStyles();
	const {
		user: { username },
	} = useSelector(authSelector);
	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	};
	return (
		<Box display="flex" justifyContent="space-between">
			<Box>
				<Typography variant="h4" color="inherit" gutterBottom>
					My Profile
				</Typography>
				<Typography variant="h5" color="inherit">
					Add favorites or watchlist some movies to see them here!
				</Typography>
			</Box>
			<Button
				variant="text"
				color="inherit"
				endIcon={<Logout />}
				onClick={logout}
			>
				Logout
			</Button>
		</Box>
	);
}

export default Profile;
