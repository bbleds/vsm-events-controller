"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

// require custom components
const Main = require('./components/Main.jsx');
const Form = require('./components/CrudEvents.jsx');
const SignUps = require('./components/Signups.jsx');

// get our react router dependencies, and use destructuring
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

// kickoff react app
ReactDOM.render(
  // pass jsx
  <div>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Form}/>
        <Route path="sign-ups" component={SignUps}/>
      </Route>
    </Router>
  </div>,
  // pass dom node
  document.getElementById('app')
);
