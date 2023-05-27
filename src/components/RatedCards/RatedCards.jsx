import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Movie } from '..';
import useStyles from './styles';

function RatedCards({ title, data }) {
	const classes = useStyles();
	return (
		<Box>
			<Typography variant="h5" mt={4}>
				{title}
			</Typography>
			<Grid container spacing={2} className={classes.moviesList}>
				{data?.results?.map((movie, i) => (
					<Movie key={movie?.id} movie={movie} index={i} />
				))}
			</Grid>
		</Box>
	);
}

export default RatedCards;
