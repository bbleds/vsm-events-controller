'use strict';

const React = require('react');
const {Link, IndexLink} = require('react-router');

// requre custom components
const eventsApi = require('./eventsApi.jsx');

// admin event listing component
const Events = React.createClass({
  getInitialState: function(){
    let that = this;

    // get events from api
    let events = eventsApi.getEvents()
    .then((data)=>{
      console.log('got data back', data);
      console.log('setting state data');
      that.setState({
        events : data,
        isLoading: false
      });
    });

    return {
      isLoading : true
    }
  },
  // render this to DOM
  render: function(){
    // msg to send to user informing them of status
    let statusMsg = this.state.isLoading ? 'Event List loading' : 'Got events';
    let eventItems ='';

    if(this.state.events){

      // build event list ul
      eventItems =  this.state.events.map((item)=>{
        let id = item.id;
        let editRoute = `/edit/${id}`;
        return (
          <li key={id}>
            {item.title}
            <IndexLink to={editRoute} >
              <button>Edit</button>
            </IndexLink>
          </li>
        )
      });
    }

    return (
      <div>
        <h3>{statusMsg}</h3>
        <ul>{eventItems}</ul>
      </div>
    );
  }
});

module.exports = Events;
