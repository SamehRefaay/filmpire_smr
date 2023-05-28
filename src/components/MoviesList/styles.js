import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	moviesList: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'auto',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		},
	},
}));
