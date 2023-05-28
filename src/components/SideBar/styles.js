import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	imageLink: {
		display: 'flex',
		justifyContent: 'center',
		padding: '10% 0',
	},
	image: {
		width: '70%',
	},
	icons: {
		width: '30px',
		height: '30px',
		filter: theme.palette.mode === 'dark' && 'invert(1)',
	},
}));
