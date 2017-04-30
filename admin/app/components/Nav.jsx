'use strict';

const React = require('react');
const {Link, IndexLink} = require('react-router');

const Nav = React.createClass({
  // render this to DOM
  render: function(){
    return (
    <nav>
      <IndexLink to='/' >Current Events</IndexLink>
      <IndexLink to='/edit' >Add Events</IndexLink>
      <IndexLink to='/sign-ups'>Sign Ups</IndexLink>
    </nav>
    );
  }
});

module.exports = Nav;
