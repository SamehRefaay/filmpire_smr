import React, { useState } from 'react';
import {
	CircularProgress,
	Typography,
	Box,
	useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MoviesList, Pagination } from '..';

function Movies() {
	const [page, setPage] = useState(1);
	const { genreIdOrCategoryName, searchQuery } = useSelector(
		state => state.currentGenreOrCategory
	);
	const { data, error, isFetching } = useGetMoviesQuery({
		genreIdOrCategoryName,
		page,
		searchQuery,
	});

	const lg = useMediaQuery('(min-width:1200px)');

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
			<MoviesList movies={data} numberOfMovies={lg ? 18 : 12} />
			<Pagination
				currentPage={page}
				setPage={setPage}
				totalPages={data?.total_pages}
			/>
		</Box>
	);
}

export default Movies;
