"use strict";

// methods for interacting with api endpoint

const axios = require('axios');
//const api_key = process.env.OPEN_WEATHER_API_KEY;
const eventsUrl = 'http://visionstudentministries.org/api/';
const api_key = 'jsismybae81761';

module.exports = {
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
  addEvent: function(){
    let requestUrl = `${eventsUrl}`;
    var params = new URLSearchParams();
    params.append('action', 'add-event');
    params.append('apikey', '');
    return axios({
      method: 'post',
      url:requestUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params
    })
    .then(function(data){
      console.log('data is', data);
      return data;
    }, function(errResp){
      throw new Error(errResp);
    })
  }
}
