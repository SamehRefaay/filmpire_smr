import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	containerSpaceAround: {
		display: 'flex',
		justifyContent: 'space-around',
		gap: '32px',
		padding: '20px',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			flexWrap: 'wrap',
		},
	},
	poster: {
		boxShadow: '0.5em 0.5em 1em rgb(76 76 80)',
		borderRadius: '20px',
		// height: '320px',
		width: '90%',
	},
	title: {
		fontWeight: 'bold',
	},
	genresIcons: {
		filter: theme.palette.mode === 'dark' && 'invert(1)',
	},
	castImages: {
		maxWidth: '100%',
		borderRadius: '10px',
	},
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	video: {
		width: '50%',
		height: '50%',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			height: '80%',
		},
	},
}));
