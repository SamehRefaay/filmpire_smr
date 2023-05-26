import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

function MoviesList({ movies, numberOfMovies }) {
	const classes = useStyles();
	return (
		<Grid container spacing={2} className={classes.moviesList}>
			{movies.results.slice(0, numberOfMovies).map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
}

export default MoviesList;
