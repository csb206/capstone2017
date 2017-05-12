/*eslint no-unused-vars: "off"*/ //don't show warnings for unused
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, {HomePage} from './HealthApp';
import {AboutPage, ResourcesPage} from './About';
import ScanPage from './ScanImage'
import LoginPage from './Login'
import SignupPage from './Signup'
import AdoptPage from './AdoptDog';

//css files
import './healthnuts.css'; //load CSS for app
import 'bootstrap/dist/css/bootstrap.css';
/*
removed:
<Route path=":breed" />
from line 22/23, no more sub links
*/

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="home" component={HomePage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="scan" component={ScanPage} />
      <Route path="resources" component={ResourcesPage} />
      <Route path="adopt/:dogName" component={AdoptPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);