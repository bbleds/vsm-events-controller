'use strict';

const React = require('react');

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
  onFormSubmit: (e)=>{
    e.preventDefault();

    // format values

    // pass to api from parent method
  },
  // render this to DOM
  render: function(){
    return (
      <form>
          <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleChange}/>
          <input type="text" name="date" placeholder="Date" value={this.state.date} onChange={this.handleChange}/>
          <input type="text" name="time" placeholder="time" value={this.state.time} onChange={this.handleChange}/>
          <input type="text" name="fee" placeholder="Fee" value={this.state.fee} onChange={this.handleChange}/>
          <button type="submit">Save</button>
      </form>
      );
  }
});

module.exports = CrudEventForm;
