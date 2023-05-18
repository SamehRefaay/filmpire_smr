import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

function MoviesList({ movies }) {
	const classes = useStyles();
	return (
		<Grid container className={classes.moviesList}>
			{movies.results.map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
}

export default MoviesList;
