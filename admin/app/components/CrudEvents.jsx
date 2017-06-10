'use strict';

const React = require('react');

// requre custom components
const eventsApi = require('./eventsApi.jsx');

const CrudEventForm = React.createClass({
  getInitialState: function(){
    // grab id passed in
    let id = this.props.params.id;

    if(id){
      eventsApi.getEvents(id)
      .then((data)=>{
        this.setState({
          title: data['0'].title,
          location: data['0'].location,
          date: data['0'].date,
          time: data['0'].time,
          fee: data['0'].fee,
          id : id
        });
      });
    }

    return {
      title: '',
      location: '',
      date: '',
      time: '',
      fee: '',
      id : id
    }
  },
  // called when props change
  componentWillReceiveProps: function(nextProps){
    // grab id passed in
    let id = nextProps.params.id;

    if(!id){
      this.setState({
        title: '',
        location: '',
        date: '',
        time: '',
        fee: '',
        id : ''
      });
    }
  },

  // change handler for form inputs
  handleChange: function(event){
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]: value
    });
  },
  // form submit handler
  onFormSubmit: function(e){
    e.preventDefault();

    let requiredFields = ['location', 'date'];
    let error = false;

    // be sure we have a value for the required fields
    for(let i =0;i<requiredFields.length;i++){
      let currentField = requiredFields[i];
      if(this.refs[currentField].value == ''){
        error = true;
      }
    }

    // get and format values
    let postData = {
      title: this.refs.title.value,
      location: this.refs.location.value,
      date: this.refs.date.value,
      time: this.refs.time.value,
      fee: this.refs.fee.value
    }

    // if this is an existing event, pass to update method
    if(this.state.id){
      postData.eventid = this.state.id;
      eventsApi.updateEvent(postData)
      .then(function(data){
        alert('Event updated successfully!');
      })

    } else {
      // default to adding new event
      eventsApi.addEvent(postData)
      .then(function(data){
        alert('Event added successfully!');
        console.log(data);
      });
    }
  },
  // render this to DOM
  render: function(){
    return (
      <div className="row">
        <div className="large-12 columns">
          <div className="page-header"><h3>Edit Event</h3></div>
          <form method="POST" id="update-form" onSubmit={this.onFormSubmit}>
              <label>Title</label>
              <input type="text" name="title" ref="title" placeholder="Enter Title..." value={this.state.title} onChange={this.handleChange}/>
              <label>Location</label>
              <input type="text" name="location" ref="location" placeholder="Enter Location..." value={this.state.location} onChange={this.handleChange}/>
              <label>Date</label>
              <input type="text" name="date" ref="date" placeholder="Enter Date..." value={this.state.date} onChange={this.handleChange}/>
              <label>Time</label>
              <input type="text" name="time" ref="time" placeholder="Enter time..." value={this.state.time} onChange={this.handleChange}/>
              <label>Fee</label>
              <input type="text" name="fee" ref="fee" placeholder="Enter Fee..." value={this.state.fee} onChange={this.handleChange}/>
              <button type="submit" className="button radius">Save</button>
          </form>
        </div>
      </div>
      );
  }
});

module.exports = CrudEventForm;
