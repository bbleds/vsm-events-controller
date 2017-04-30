"use strict";

// methods for interacting with api endpoint

const axios = require('axios');
//const api_key = process.env.OPEN_WEATHER_API_KEY;
const eventsUrl = 'http://visionstudentministries.org/api/';

module.exports = {
  getEvents: function(){
    // url encode our location
    let requestUrl = `${eventsUrl}?action=events-list`;
    return axios.get(requestUrl)
    .then(function(data){
      console.log('data is', data);
      return data.data;
    }, function(errResp){
      throw new Error(errResp.data.message);
    });
  }
}
