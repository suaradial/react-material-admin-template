/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/App';
//import DashboardPage from './containers/DashboardPage';

import './styles.scss';

require('./favicon.ico');

//import 'font-awesome/css/font-awesome.css';
//import 'flexboxgrid/css/flexboxgrid.css';

//<Router routes={routes} history={browserHistory} />

// Imperative to leve this for material ui touch animations
injectTapEventPlugin();

render(
    <BrowserRouter >
      <App />
    </BrowserRouter >
    , document.getElementById('app')
);
