import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/currentGenreOrCategory';
import useStyle from './styles';

function Search() {
	const classes = useStyle();
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');
	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			dispatch(searchMovie(query));
		}
	};

	const location = useLocation();
	if (location.pathname !== '/' && location.pathname !== '/approved') {
		return null;
	}

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
