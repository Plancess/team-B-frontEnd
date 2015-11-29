'use strict';

angular.module('paqApp')
      /**
       * DataSource factory
       */
  .factory('DataSource', function($http, cookieStore, RestAPI) {
    var userId = cookieStore.getUserId();
    var client_id = "7lN5yUnfHP2kOgQbTN0CgFM9BhO65QXhgmzvvuo1";
    var client_secret = "n8KfS0ud6qqcCL4E0WE9WQK4qAP0BHep1AJ7074BdwXBCERU6bv1Y6lDPMtkTNJ2XOmV5CzTWngtrQCAWUXWe2KZQqXAH6nninJ6fgR47DgAKKVr3jfOHq34gSD9m22L";

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
      postAnswer: function(data){
        return RestAPI.all('answer').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      postComment: function(data){
        return RestAPI.all('comment').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      postVote: function(data){
        return RestAPI.all('vote').post($.param(data), {},{'Content-Type': 'application/x-www-form-urlencoded'});
      },
      getAllTags: function(){
        return RestAPI.one('tags').get({});
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