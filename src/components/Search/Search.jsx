import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovie } from '../../features/currentGenreOrCategory';
import useStyle from './styles';

function Search() {
	const classes = useStyle();
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			// window.location.href = '/';
			dispatch(searchMovie(query));
		}
	};
	return (
		<div className={classes.searchContainer}>
			<TextField
				variant="standard"
				value={query}
				onChange={e => setQuery(e.target.value)}
				onKeyPress={handleKeyPress}
				InputProps={{
					className: classes.input,
					// startAdornment: <InputAdornment position="start">kg</InputAdornment>,
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
}

export default Search;