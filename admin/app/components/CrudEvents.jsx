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
  },
  // render this to DOM
  render: function(){
    return (
      <form>
          <input type="text" name="location" placeholder="Location" />
          <input type="text" name="date" placeholder="Location" />
      </form>
      );
  }
});

module.exports = CrudEventForm;
