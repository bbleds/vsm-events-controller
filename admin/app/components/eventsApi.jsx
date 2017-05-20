"use strict";

// methods for interacting with api endpoint

const axios = require('axios');
//const api_key = process.env.OPEN_WEATHER_API_KEY;
const eventsUrl = 'http://visionstudentministries.org/api/';
const api_key = '';

module.exports = {
  // gets a list of current events
  getEvents: function(){
    // url encode our location
    let requestUrl = `${eventsUrl}?action=events-list`;
    return axios.get(requestUrl)
    .then(function(data){
      console.log('data is', data);
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
  }
}
