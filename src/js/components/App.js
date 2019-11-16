import React, { Component } from 'react';
import '../../styles/sass/app.scss';
import { Provider } from 'react-redux';
import store from 'Store/init-redux';
import Main from 'Components/contents/Main/Main';


const App = () =>
	<Provider store={store}>
		<Main />
	</Provider>

export default App;