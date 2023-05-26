import { makeStyles } from '@mui/styles';

export default makeStyles(theme => ({
	container: {
		// display: 'flex',
		// gap: '30px',
	},
	actorImage: {
		float: 'left',
		height: '500px',
		maxWidth: '100%',
		boxShadow: '0.5em 0.5em 1em rgb(76 76 80)',
		borderRadius: '20px',
		margin: '0 50px 10px 0',
	},
	textContent: {
		width: '100%',
		minHeight: '500px',
	},
}));
