import React from 'react';
import { Button, Typography } from '@mui/material';
import useStyles from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
	const classes = useStyles();
	const handlePrev = () => {
		if (currentPage !== 1) {
			setPage(prevPage => prevPage - 1);
		}
	};
	const handleNext = () => {
		if (currentPage !== totalPages) {
			setPage(prevPage => prevPage + 1);
		}
	};
	return (
		<div className={classes.contianer}>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={handlePrev}
			>
				Prev
			</Button>
			<Typography className={classes.pageNumber} variant="h6">
				{currentPage}
			</Typography>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={handleNext}
			>
				Next
			</Button>
		</div>
	);
}

export default Pagination;
