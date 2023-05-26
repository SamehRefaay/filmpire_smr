import React from 'react';
import { Grid, Grow, Typography, Box, Rating, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

function Movie({ movie, index }) {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
			<Grow in timeout={(index + 1) * 250} key={index}>
				<Link className={classes.links} to={`/movie/${movie?.id}`}>
					<img
						src={
							movie?.poster_path
								? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
								: 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWV8ZW58MHwxfDB8fHwy&auto=format&fit=crop&w=500&q=60'
						}
						alt={movie?.title}
						className={classes.image}
					/>
					<Typography className={classes.title} variant="h5">
						{movie?.title}
					</Typography>
					<Tooltip disableTouchListener title={`${movie?.vote_average} / 10`}>
						<Box>
							<Rating readOnly value={movie.vote_average / 2} precision={0.1} />
						</Box>
					</Tooltip>
				</Link>
			</Grow>
		</Grid>
	);
}

export default Movie;
