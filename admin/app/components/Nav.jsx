'use strict';

const React = require('react');
const {Link, IndexLink} = require('react-router');

const Nav = React.createClass({
  // render this to DOM
  render: function(){
    return (
    <nav>
      <IndexLink to='/' activeClassName="active" activeStyle={{fontWeight:'bold'}}>Add Event</IndexLink>
      <IndexLink to='/sign-ups' activeClassName="active"  activeStyle={{fontWeight:'bold'}}>Sign Ups</IndexLink>
    </nav>
    );
  }
});

module.exports = Nav;
