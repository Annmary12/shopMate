import React from 'react';
import ReactDOM from 'react-dom';

// third party library
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './store';
import dotenv from 'dotenv';

// components
import App from './App';
import history from './utils/history';


dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>, document.getElementById('root')
);
