/*eslint no-unused-vars: "off"*/ //don't show warnings for unused
import React from 'react';
import ReactDOM from 'react-dom';
import App from './PetApp';
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptDog';

//css files
import './pet-app.css'; //load CSS for app
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);