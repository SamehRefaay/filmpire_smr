import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	contianer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '20px',
	},
	button: {
		padding: '5px 15px',
		color: theme.palette.text.primary,
	},
	pageNumber: {
		margin: '0 20px !important',
	},
}));
