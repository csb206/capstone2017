/*eslint no-unused-vars: "off"*/ //don't show warnings for unused
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App, {HomePage} from './HealthApp';
import GetImagePage from './GetImage';
import NutritionHistoryPage from './NutritionHistory.js';
import LoginPage from './Login';
import SignupPage from './Signup';
import ScanPage from './ScanImage';
import SavePage from './SaveFood';
import GoalsPage from './GoalsChallenges';

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
      <Route path="getimage" component={GetImagePage} />
      <Route path="history" component={NutritionHistoryPage} />
      <Route path="scan" component={ScanPage} />
      <Route path="save" component={SavePage} />
      <Route path="goals" component={GoalsPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);