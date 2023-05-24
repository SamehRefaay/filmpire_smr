import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import { Movie } from '..';

function MoviesList({ movies }) {
	const classes = useStyles();
	return (
		<Grid container className={classes.moviesList} marginLeft="0">
			{movies.results.slice(0, 12).map((movie, index) => (
				<Movie key={index} movie={movie} index={index} />
			))}
		</Grid>
	);
}

export default MoviesList;
