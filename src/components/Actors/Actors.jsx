import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import useStyles from './styles';
import {
	useGetActorDetailsQuery,
	useGetMovieByActorIdQuery,
} from '../../services/TMDB';
import MoviesList from '../MoviesList/MoviesList';
import Pagination from '../Pagination/Pagination';

function Actors() {
	const classes = useStyles();
	const { id } = useParams();
	const [page, setPage] = useState(1);
	const { data, isFetching, error } = useGetActorDetailsQuery(id);
	const { data: actorMoviesData, isFetching: isActorMoviesFetching } =
		useGetMovieByActorIdQuery({ id, page });

	const dateFormate = date => {
		const birthday = new Date(date);
		return birthday.toLocaleDateString('en', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	if (isFetching) {
		return (
			<Box className={classes.container}>
				<CircularProgress size="4rem" />
			</Box>
		);
	}

	if (error) {
		return (
			<Box className={classes.container}>
				<Typography variant="" />
			</Box>
		);
	}

	if (data) {
		return (
			<>
				{/* character data */}
				<Box className={classes.container}>
					<img
						className={classes.actorImage}
						src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
						alt={data?.name}
					/>
					<Box className={classes.textContent}>
						{/* name */}
						<Typography
							variant="h3"
							gutterBottom
							textAlign="center"
							fontWeight="bold"
						>
							{data?.name}
						</Typography>
						{/* birthday */}
						<Typography variant="h5" gutterBottom textAlign="start">
							Born: {dateFormate(data?.birthday)}
						</Typography>
						{/* deathday */}
						{data?.deathday && (
							<Typography variant="h5" gutterBottom textAlign="start">
								Died: {dateFormate(data?.deathday)}
							</Typography>
						)}
						{/* biography */}
						<Typography
							variant="body1"
							gutterBottom
							textAlign="start"
							fontSize="1.3em"
						>
							{data?.biography}
						</Typography>
						<Box
							display="flex"
							justifyContent="space-evenly"
							alignItems="center"
							mt="20px"
						>
							<Button
								size="large"
								variant="contained"
								href={`https://www.imdb.com/title/${data?.imdb_id}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Imdb
							</Button>
							<Button
								size="large"
								variant="outlined"
								href="/"
								startIcon={<ArrowBack />}
							>
								Back
							</Button>
						</Box>
					</Box>
				</Box>
				{/* movies */}
				<Box mt="30px">
					<Typography variant="h3" textAlign="center">
						Movies
					</Typography>
					<Box>
						{actorMoviesData && (
							<>
								<MoviesList movies={actorMoviesData} />

								<Pagination
									currentPage={page}
									setPage={setPage}
									totalPages={actorMoviesData?.total_pages}
								/>
							</>
						)}
					</Box>
				</Box>
			</>
		);
	}
}

export default Actors;
