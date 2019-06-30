import React from 'react';

// third  party libraries
import Routes from './routes';

// components
import Navbar from './components/Navbar';

// global style
import './assets/scss/globals.scss';
import 'font-awesome/css/font-awesome.min.css';

const App = () =>  (
  <>
    <Navbar />
    <Routes />
  </>
)


export default App;
