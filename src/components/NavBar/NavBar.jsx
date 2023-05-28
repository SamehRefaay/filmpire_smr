import React, { useState, useEffect, useContext } from 'react';
import {
	AppBar,
	IconButton,
	Toolbar,
	useMediaQuery,
	Button,
	Avatar,
	Drawer,
} from '@mui/material';
import { AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { setUser, authSelector } from '../../features/authentication';

import { Search, SideBar } from '..';
import useStyles from './styles';
import { fetchToken, movieApi, createSessionId } from '../../utils';

function NavBar() {
	const theme = useTheme();
	const classes = useStyles();
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width:600px)');
	const { isAuthenticated, user } = useSelector(authSelector);
	const [mobileOpen, setMobileOpen] = useState(false);

	const token = localStorage.getItem('request_token');

	const { toggleColorMode } = useContext(ColorModeContext);

	useEffect(() => {
		const loginUser = async () => {
			if (token) {
				try {
					const sessionId = localStorage.getItem('session_id')
						? localStorage.getItem('session_id')
						: await createSessionId();
					const { data: userData } = await movieApi.get(
						`/account?session_id=${sessionId}`
					);
					// console.log(userData);
					dispatch(setUser(userData));
				} catch (error) {
					console.log('sorry your data could not be fetched.');
				}
			}
		};
		loginUser();
	}, [token]);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar
					// sx={{ marginLeft: { sm: '240px' } }}
					className={classes.toolbar}
				>
					{isMobile && (
						<IconButton
							className={classes.menuButton}
							color="inherit"
							edge="start"
							style={{ outline: 'none' }}
							onClick={() => {
								setMobileOpen(prevMobileOpen => !prevMobileOpen);
							}}
						>
							<MenuIcon />
						</IconButton>
					)}
					<IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleColorMode}>
						{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
					{!isMobile && <Search />}
					<div>
						{!isAuthenticated ? (
							<Button
								color="inherit"
								onClick={() => {
									fetchToken();
								}}
							>
								Login &nbsp; <AccountCircle />
							</Button>
						) : (
							<Button
								LinkComponent="a"
								color="inherit"
								href={`/profile/:${user.id}`}
								className={classes.linkButton}
							>
								{!isMobile ? (
									<>
										My Movies &nbsp;
										<Avatar src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1684113235~exp=1684113835~hmac=93c969dc4c4b0faae588815989d176de37a275897e6378612c2227d5e7e1d5bb" />
									</>
								) : (
									<Avatar src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=740&t=st=1684113235~exp=1684113835~hmac=93c969dc4c4b0faae588815989d176de37a275897e6378612c2227d5e7e1d5bb" />
								)}
							</Button>
						)}
					</div>
					{isMobile && <Search />}
				</Toolbar>
			</AppBar>
			<div>
				<nav className={classes.drawer}>
					{isMobile ? (
						<Drawer
							variant="temporary"
							anchor="right"
							open={mobileOpen}
							ModalProps={{ keepMounted: true }}
							onClose={() => {
								setMobileOpen(prevMobileOpen => !prevMobileOpen);
							}}
							classes={{ paper: classes.drawerPaper }}
						>
							<SideBar setMobileOpen={setMobileOpen} />
						</Drawer>
					) : (
						<Drawer
							variant="permanent"
							anchor="left"
							open
							classes={{ paper: classes.drawerPaper }}
						>
							<SideBar setMobileOpen={setMobileOpen} />
						</Drawer>
					)}
				</nav>
			</div>
		</>
	);
}

export default NavBar;
