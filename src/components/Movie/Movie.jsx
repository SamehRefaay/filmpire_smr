import React from 'react';
import { Grid, Grow, Typography, Box, Rating, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

function Movie({ movie, index }) {
	const classes = useStyles();
	return (
		<Box padding="10px 0">
			<Grid item className={classes.movie}>
				<Grow in timeout={(index + 1) * 250} key={index}>
					<Link className={classes.links} to={`/movie/${movie.id}`}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							alt="ddd"
							className={classes.image}
						/>
						<Typography className={classes.title} variant="h5">
							{movie.title}
						</Typography>
						<Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
							<Box>
								<Rating
									readOnly
									value={movie.vote_average / 2}
									precision={0.1}
								/>
							</Box>
						</Tooltip>
					</Link>
				</Grow>
			</Grid>
		</Box>
	);
}

export default Movie;
