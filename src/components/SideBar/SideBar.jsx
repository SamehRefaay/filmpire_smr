import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import {
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genresIcons from '../../assets/genres and categories';

const blueLogo =
	'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
	'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const demoCategories = [
	{ label: 'Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top-rated' },
	{ label: 'Upcoming', value: 'upcoming' },
];

function SideBar({ setMobileOpen }) {
	const navigate = useNavigate();
	const theme = useTheme();
	const classes = useStyles();
	const { data, isFetching } = useGetGenresQuery();
	const dispatch = useDispatch();
	return (
		<>
			<Link to="/" className={classes.imageLink}>
				<img
					src={theme.palette.mode === 'light' ? blueLogo : redLogo}
					alt="filmpire logo"
					className={classes.image}
				/>
			</Link>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{demoCategories.map(({ label, value }) => (
					<ListItem key={value}>
						<ListItemButton
							className={classes.links}
							onClick={() => {
								if (
									window.location.href !== '/' ||
									window.location.href !== '/approved'
								) {
									navigate('/');
								}
								dispatch(selectGenreOrCategory(value));
							}}
						>
							<ListItemIcon>
								<img
									alt={label}
									src={genresIcons[label.toLowerCase()]}
									className={classes.icons}
								/>
							</ListItemIcon>
							<ListItemText>{label}</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Box>
						<CircularProgress />
					</Box>
				) : (
					data.genres.map(({ name, id }) => (
						<ListItem key={id}>
							<ListItemButton
								className={classes.links}
								onClick={() => {
									console.log(name, id);
									if (
										window.location.href !== '/' ||
										window.location.href !== '/approved'
									) {
										navigate('/');
									}
									dispatch(selectGenreOrCategory(id));
								}}
							>
								<ListItemIcon>
									<img
										alt={name}
										src={genresIcons[name.toLowerCase()]}
										className={classes.icons}
									/>
								</ListItemIcon>
								<ListItemText>{name}</ListItemText>
							</ListItemButton>
						</ListItem>
					))
				)}
			</List>
		</>
	);
}

export default SideBar;
