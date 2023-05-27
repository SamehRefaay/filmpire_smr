import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	Alert,
	Box,
	Button,
	ButtonGroup,
	CircularProgress,
	Grid,
	Modal,
	Rating,
	Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	ArrowBack,
	Error,
	Favorite,
	FavoriteBorder,
	Language,
	Movie,
	Theaters,
} from '@mui/icons-material';
import {
	useGetListQuery,
	useGetMovieDetailsQuery,
	useGetRecommendationsMoviesQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import genresIcons from '../../assets/genres and categories';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import MoviesList from '../MoviesList/MoviesList';
import { addMovieToFavorite, addMovieToWatchlist } from '../../utils';
import { authSelector } from '../../features/authentication';

function MovieInformation() {
	const { id } = useParams();
	const { user } = useSelector(authSelector);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [isMovieFavorited, setIsMovieFavorited] = useState(false);
	const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

	const { data, isFetching, error } = useGetMovieDetailsQuery(id);
	const {
		data: recommendationsData,
		isFatching: recommendationFetching,
		error: recommendationError,
	} = useGetRecommendationsMoviesQuery(id);

	const { data: favoriteListMovies } = useGetListQuery({
		accountId: user.id,
		listName: 'favorite/movies',
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});

	const { data: watchListMovies } = useGetListQuery({
		accountId: user.id,
		listName: 'watchlist/movies',
		sessionId: localStorage.getItem('session_id'),
		page: 1,
	});

	useEffect(() => {
		setIsMovieFavorited(
			!!favoriteListMovies?.results?.find(movie => movie?.id === data?.id)
		);
	}, [favoriteListMovies, data]);

	useEffect(() => {
		setIsMovieWatchListed(
			!!watchListMovies?.results?.find(movie => movie?.id === data?.id)
		);
	}, [watchListMovies, data]);

	const toggleFavorite = async () => {
		await addMovieToFavorite(user.id, id, isMovieFavorited);
		setIsMovieFavorited(prev => !prev);
	};
	const toggleWatchlisted = async () => {
		await addMovieToWatchlist(user.id, id, isMovieFavorited);
		setIsMovieWatchListed(prev => !prev);
	};

	if (isFetching) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<CircularProgress size="4rem" />
			</Box>
		);
	}
	if (error) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center">
				<Typography variant="h4">
					`Sorry Movie Information does not available click back`
				</Typography>
			</Box>
		);
	}
	return (
		<>
			<Grid container columnSpacing={2}>
				<Grid item xs={12} md={4}>
					<Grid item>
						<img
							className={classes.poster}
							src={
								data?.poster_path
									? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
									: 'noImage'
							}
							alt={data?.title}
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={8} direction="column" rowSpacing={1}>
					{/* title */}
					<Grid item textAlign="center">
						<Typography variant="h4" className="title" color="text.primary">
							{data?.title} ({data?.release_date.split('-')[0]})
						</Typography>
					</Grid>
					{/* tagline */}
					<Grid item textAlign="center">
						<Typography variant="h5" color="text.secondary">
							{data?.tagline}
						</Typography>
					</Grid>
					<Grid item container textAlign="center" justifyContent="space-evenly">
						<Grid item>
							<Box display="flex" gap={2} alignItems="center">
								<Rating
									readOnly
									value={data.vote_average / 2}
									precision={0.5}
								/>
								<Typography
									variant="h6"
									color="text.secondary"
								>{`${data?.vote_average.toFixed(1)}/10`}</Typography>
							</Box>
						</Grid>
						<Grid item>
							<Typography variant="h6">
								{`${data?.runtime}min / ${data?.spoken_languages[0].name}`}{' '}
							</Typography>
						</Grid>
					</Grid>

					{/* genres */}
					<Grid item container justifyContent="space-evenly">
						{data.genres.map(genre => (
							<Link
								key={genre.id}
								to="/"
								onClick={() => {
									dispatch(selectGenreOrCategory(genre.id));
								}}
							>
								<Box display="flex" flexWrap="wrap" gap="10px">
									<img
										src={genresIcons[genre.name.toLowerCase()]}
										alt={genre.name}
										height="30px"
										className={classes.genresIcons}
									/>
									<Typography>{genre.name}</Typography>
								</Box>
							</Link>
						))}
					</Grid>

					{/* overview */}
					<Grid item mt={2}>
						<Typography variant="h5" gutterBottom>
							Overview
						</Typography>
						<Typography
							variant="body1"
							gutterBottom
							color="text.secondary"
							fontSize="1.2em"
						>
							{data?.overview}
						</Typography>
					</Grid>
					{/* top cast */}
					<Grid item mt={2}>
						<Typography variant="h5" gutterBottom>
							Top Cast
						</Typography>
						<Grid
							item
							container
							justifyContent="flex-start"
							gap="20px"
							flexWrap="wrap"
						>
							{data.credits.cast.slice(0, 6).map(
								item =>
									item.profile_path && (
										<Box key={item.name} borderRadius="10px" maxWidth="100px">
											,
											<Link
												to={`/actors/${item.id}`}
												className={classes.actorLink}
											>
												<img
													src={`https://image.tmdb.org/t/p/w500/${item?.profile_path}`}
													alt={item.name}
													className={classes.castImages}
												/>

												<Typography
													className={classes.actorName}
													variant="subtitle1"
													maxWidth="100%"
													color="text.primary"
												>
													{item.name}
												</Typography>
											</Link>
											<Typography
												variant="subtitle2"
												textAlign="center"
												color="text.secondary"
											>
												{item.character}
											</Typography>
										</Box>
									)
							)}
						</Grid>
					</Grid>
					{/* buttons group */}
					<Grid item container justifyContent="space-evenly" flexWrap="wrap">
						<Grid item>
							<ButtonGroup variant="outlined">
								<Button
									href={data?.homepage}
									target="_blank"
									rel="noopener noreferrer"
									endIcon={<Language />}
								>
									Website
								</Button>
								<Button
									href={`https://www.imdb.com/title/${data?.imdb_id}`}
									target="_blank"
									rel="noopener noreferrer"
									endIcon={<Movie />}
								>
									Imdb
								</Button>
								<Button
									onClick={() => {
										setOpen(true);
									}}
									endIcon={<Theaters />}
								>
									Trailer
								</Button>
							</ButtonGroup>
						</Grid>
						<Grid item>
							<ButtonGroup variant="outlined" size="medium">
								<Button
									onClick={toggleFavorite}
									endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorder />}
								>
									{isMovieFavorited ? 'Un Favorite' : 'Favorite'}
								</Button>
								<Button onClick={toggleWatchlisted}>
									{isMovieWatchListed ? 'Watchlist -' : 'Watchlist + 1'}
								</Button>
								<Button href="/" endIcon={<ArrowBack />}>
									back
								</Button>
							</ButtonGroup>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Box>
				<Typography variant="h3" textAlign="center" mt={2} gutterBottom>
					You might also like
				</Typography>
				<>
					{recommendationFetching && (
						<Box>
							<CircularProgress size="4rem" />
						</Box>
					)}
					{recommendationError && (
						<Box>
							<Typography variant="h4" color="inherit">
								Sorry, nothing was found.
							</Typography>
						</Box>
					)}
					{recommendationsData && (
						<Box width="100%">
							<MoviesList movies={recommendationsData} />
						</Box>
					)}
				</>
			</Box>
			<Modal
				closeAfterTransition
				className={classes.modal}
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			>
				{data?.videos?.results?.length > 0 ? (
					<iframe
						autoPlay
						allow="autoplay"
						className={classes.video}
						title="Trailer"
						src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
					/>
				) : (
					<Alert icon={<Error />} Error className={classes.video}>
						Sorry, there are no trailer found for this movie.
					</Alert>
				)}
			</Modal>
		</>
	);
}

export default MovieInformation;
