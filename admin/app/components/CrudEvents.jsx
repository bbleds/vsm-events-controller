'use strict';

const React = require('react');

// requre custom components
const eventsApi = require('./eventsApi.jsx');

const CrudEventForm = React.createClass({
  getInitialState: function(){
    // grab id passed in
    let id = this.props.params.id;

    return {
      location: '',
      date: '',
      time: '',
      fee: ''
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
      location: this.refs.location.value,
      date: this.refs.date.value,
      time: this.refs.time.value,
      fee: this.refs.fee.value
    }

    // pass to api from parent method
    eventsApi.addEvent(postData)
    .then(function(data){
      console.log(data);
    });
  },
  // render this to DOM
  render: function(){
    return (
      <form method="POST" onSubmit={this.onFormSubmit}>
          <input type="text" name="location" ref="location" placeholder="Location" value={this.state.location} onChange={this.handleChange}/>
          <input type="text" name="date" ref="date" placeholder="Date" value={this.state.date} onChange={this.handleChange}/>
          <input type="text" name="time" ref="time" placeholder="time" value={this.state.time} onChange={this.handleChange}/>
          <input type="text" name="fee" ref="fee" placeholder="Fee" value={this.state.fee} onChange={this.handleChange}/>
          <button type="submit">Save</button>
      </form>
      );
  }
});

module.exports = CrudEventForm;
