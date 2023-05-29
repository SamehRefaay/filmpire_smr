import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

function MoviesList({ movies, numberOfMovies, excludeFirst }) {
	const startFrom = excludeFirst ? 1 : 0;
	const classes = useStyles();
	return (
		<Grid container spacing={2} className={classes.moviesList}>
			{movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
}

export default MoviesList;
