'use strict';

const React = require('react');

const CrudEventForm = React.createClass({
  getInitialState: ()=>{
      return {
        location: '',
        date: '',
        time: '',
        fee: ''
      }
  },
  handleChange: function(event){
    let value = event.target.value;
    let name = event.target.name;

    this.setState({
      [name]: value
    });
  },
  onFormSubmit: (e)=>{
    e.preventDefault();
  },
  // render this to DOM
  render: function(){
    return (
    <form method="POST" onSubmit={this.onFormSubmit}>
      <input type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleChange}/>
      <input type="text" name="date" placeholder="Date" value={this.state.date} onChange={this.handleChange} />
      <input type="text" name="time" placeholder="Time" value={this.state.time} onChange={this.handleChange} />
      <input type="text" name="fee" placeholder="Fee" value={this.state.fee} onChange={this.handleChange} />
      <button type="submit">Save</button>
    </form>
    );
  }
});

module.exports = CrudEventForm;
