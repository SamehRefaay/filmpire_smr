import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({});

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<React.StrictMode>
				<Router>
					<App />
				</Router>
			</React.StrictMode>
		</ThemeProvider>
	</Provider>
);
