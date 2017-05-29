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
    let statusMsg = this.state.isLoading ? 'Event List loading' : 'Current Events';
    let eventItems ='';

    if(this.state.events){

      // build event list ul
      eventItems =  this.state.events.map((item)=>{
        let id = item.id;
        let editRoute = `/edit/${id}`;
        return (
          <div className="large-4 columns" key={id}>
            <div className="card">
              <div className="card-section card-title">
                <h4>{item.title}</h4>
                <hr className="small-4 colums"></hr>
              </div>
              <div className="card-section card-details">
                <div className="small-12 colums"><span className="subtle-text">Location:</span> {item.location}</div>
                <div className="small-12 colums"><span className="subtle-text">Date:</span> {item.date}</div>
                <div className="small-12 colums"><span className="subtle-text">Time:</span> {item.time}</div>
                <div className="small-12 colums"><span className="subtle-text">Fee:</span> {item.fee}</div>
              </div>
              <div className="card-section card-footer">
                <IndexLink to={editRoute} >
                  <button className="button radius">Edit</button>
                </IndexLink>
              </div>
          </div>
          </div>
        )
      });
    }

    return (
      <div>
        <div className="page-header"><h3>{statusMsg}</h3></div>
        <div className="row expanded">{eventItems}</div>
      </div>
    );
  }
});

module.exports = Events;
