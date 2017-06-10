"use strict";

// methods for interacting with api endpoint

const axios = require('axios');
//const api_key = process.env.OPEN_WEATHER_API_KEY;
const eventsUrl = 'http://visionstudentministries.org/api/';
const api_key = 'jsismybae81761';

module.exports = {
  // gets a list of current events or a single event
  getEvents: function($eventId){
    // url encode our location
    let requestUrl = `${eventsUrl}?`;
    let queryString = `action=events-list&apikey=${api_key}&eventid=${$eventId}`;

    return axios({
      method: 'post',
      url:requestUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString
    })
    .then(function(data){
      return data.data;
    }, function(errResp){
      throw new Error(errResp);
    });
  },
  // adds an event to the database
  addEvent: function(data){
    let requestUrl = `${eventsUrl}`;
    let queryString = `action=add-event&apikey=${api_key}`;
    // build query string to pass from data passed in
    for(let key in data){
      let value = data[key];
      queryString+=`&${key}=${value}`;
    }

    // post data to API endpoint
    return axios({
      method: 'post',
      url:requestUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString
    })
    .then(function(data){
      console.log('data is', data);
      return data;
    }, function(errResp){
      throw new Error(errResp);
    })
  },
  // updates an existing event in db
  updateEvent: function(data){
    let requestUrl = `${eventsUrl}`;
    let queryString = `action=update-event&apikey=${api_key}`;

    // build query string to pass from data passed in
    for(let key in data){
      let value = data[key];
      queryString+=`&${key}=${value}`;
    }

    // post data to API endpoint
    return axios({
      method: 'post',
      url:requestUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString
    })
    .then(function(data){
      console.log('data from update is', data);
      return data;
    }, function(errResp){
      throw new Error(errResp);
    })
  }
}
