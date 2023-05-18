import React, { useState } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MoviesList } from '..';

function Movies() {
	const [page, setPage] = useState(1);
	const { genreIdOrCategoryName } = useSelector(
		state => state.currentGenreOrCategory
	);
	const { data, error, isFetching } = useGetMoviesQuery({
		genreIdOrCategoryName,
		page,
	});

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<CircularProgress size="4rem" />
			</Box>
		);
	}

	if (!data.results.length) {
		return (
			<Box display="flex" align="center" mt="20px">
				<Typography variant="h4">
					No Movies that match that name.
					<br />
					please search for something else.
				</Typography>
			</Box>
		);
	}
	if (error) {
		return 'An error has occured';
	}

	return (
		<Box>
			<MoviesList movies={data} />
		</Box>
	);
}

export default Movies;
