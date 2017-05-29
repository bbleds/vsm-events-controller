"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

// require custom components
const Main = require('./components/Main.jsx');
const EventForm = require('./components/CrudEvents.jsx');
const SignUps = require('./components/Signups.jsx');
const Events = require('./components/Events.jsx');

// get our react router dependencies, and use destructuring
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

// kick off foundation and require our styles
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// add our custom styles
require('style!css!sass!./styles/app.scss');

// kickoff react app
ReactDOM.render(
  // pass jsx
  <div>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Events}/>
        <Route path="edit(/:id)" component={EventForm}/>
        <Route path="sign-ups" component={SignUps}/>
      </Route>
    </Router>
  </div>,
  // pass dom node
  document.getElementById('app')
);
