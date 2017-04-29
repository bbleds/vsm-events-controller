'use strict';

const React = require('react');

// require custom components
const Nav = require('./Nav.jsx');

const Main = React.createClass({
  // render this to DOM
  render: function(){
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Main;
