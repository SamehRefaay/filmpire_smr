import { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import {
	selectGenreOrCategory,
	searchMovie,
} from '../features/currentGenreOrCategory';

const Alan = () => {
	const { setMode } = useContext(ColorModeContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		alanBtn({
			key: 'b0559494185cc14f3d7cd2cb4e5ef9092e956eca572e1d8b807a3e2338fdd0dc/stage',
			onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
				if (command === 'chooseGenre') {
					const foundGenre = genres.find(
						g => g.name.toLowerCase() === genreOrCategory.toLowerCase()
					);
					if (foundGenre) {
						navigate('/');
						dispatch(selectGenreOrCategory(foundGenre.id));
					} else {
						const category = genreOrCategory.startsWith('top')
							? 'top_rated'
							: genreOrCategory;
						navigate('/');
						dispatch(selectGenreOrCategory(category));
					}
				} else if (command === 'search') {
					navigate('/');
					dispatch(searchMovie(query));
				} else if (command === 'changeMode') {
					if (mode === 'dark') {
						setMode('dark');
					} else {
						setMode('light');
					}
				} else if (command === 'login') {
					fetchToken();
				} else if (command === 'logout') {
					localStorage.clear();
					window.location.href = '/';
				}
			},
		});
	}, []);
};

export default Alan;
