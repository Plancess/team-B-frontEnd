'use strict';

angular.module('paqApp')
      /**
       * DataSource factory
       */
  .factory('DataSource', function($http, cookieStore, RestAPI) {
    var userId = cookieStore.getUserId();
    var client_id = "cowkBqV9OgZzuIZUpD28J649QVb3dAsWnBXUTfUd";
    var client_secret = "3zvNr5XKVfsBESBjuC15dZdrxqzIheifpKF3hiEAXnoxTfGQYKyr9gH4hzsxYDbKQyZeMjwfE1WmmdjaO9NAJlfJpZD21aT0QkhnX7mqy83uymTN1Yn9X8nXDnzaR8EC";

    return {
      register: function(data){
      	return RestAPI.all('users').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      getAccessToken: function(data){
      	data.client_id = client_id;
      	data.client_secret = client_secret;
      	data.grant_type = "password";
      	return RestAPI.all('auth').all('token').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      askQuestion: function(data){
        data.user = cookieStore.getUserId();
        return RestAPI.all('question').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      getQuestions: function(){
        return RestAPI.one('question').get({});
      },
      getQuestionDetails: function(questionId){
        return RestAPI.one('question',questionId).get({});
      },
      getUserData: function() {
        return RestAPI.one('users', userId).get({'format':'json'},{});
      },
      getUserIdData: function () {
        return RestAPI.one('users').one('details').get({});
      },
      loggedOut: function (data) {
        return RestAPI.all('auth').all('revoke-token').post(data, undefined);
      }
    };
  });