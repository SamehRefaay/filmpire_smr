import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ToggleColorModeProvider from './utils/ToggleColorMode';
import store from './app/store';
import App from './components/App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<ToggleColorModeProvider>
			<React.StrictMode>
				<Router>
					<App />
				</Router>
			</React.StrictMode>
		</ToggleColorModeProvider>
	</Provider>
);
