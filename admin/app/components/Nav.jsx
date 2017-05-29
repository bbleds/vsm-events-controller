'use strict';

const React = require('react');
const {Link, IndexLink} = require('react-router');

const Nav = React.createClass({
  // render this to DOM
  render: function(){
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">VSM Event Manager</li>
              <li><IndexLink to='/' >Current Events</IndexLink></li>
              <li><IndexLink to='/edit' >Add Events</IndexLink></li>
              <li><IndexLink to='/sign-ups'>Sign Ups</IndexLink></li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Nav;
