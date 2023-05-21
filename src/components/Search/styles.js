import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	searchContainer: {
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		},
	},

	input: {
		color: theme.palette.mode === 'light' && 'black',
		filter: theme.palette.mode === 'light' && 'invert(1)',

		[theme.breakpoints.down('sm')]: {
			marginTop: '-10px',
			marginBottom: '10px',
		},
	},
}));
