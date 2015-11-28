'use strict';

angular.module('paqApp')
.factory('cookieStore', function($cookies) {
  var loggedOut;
  var facebookToken;
  var googlePlusToken;
  var userSocialProfile = {};
  return {
    saveToCookie: function (res) {
      var cookieData = {
        'access_token' : res.access_token,
        'refresh_token' : res.refresh_token,
        'token_type' : res.token_type
      };
      $cookies.putObject('paqCookie', cookieData, {path:'/'});
    },
    saveUserToCookie : function (response) {
      var cookieData = $cookies.getObject('paqCookie');
      cookieData.user_id = response.user_id;
      cookieData.email = response.email;
      $cookies.putObject('paqCookie', cookieData, {path:'/'});
    },
    clearCookie: function () {
      $cookies.remove('paqCookie',{path:'/'});
      $cookies.remove('paqCookie',{path:'/app'});
    },
    getCookie: function () {
      return $cookies.getObject('paqCookie',  {path:'/'});
    },
    getUserId: function () {
      var cookie = $cookies.getObject('paqCookie',  {path:'/'});
      if (cookie) {
        return cookie.user_id;
      }
    },
    saveFacebookToken: function(res) {
      if (res !== null && res.authResponse !== null) {
        if (res.authResponse.accessToken !== null) {
          facebookToken = res.authResponse.accessToken;
        }
      }
    },
    getFacebookToken: function(res){
      return facebookToken;
    },
    saveGooglePlusToken: function(res) {
      if(res !== null) {
        if(res.access_token !== null) {
          googlePlusToken = res.access_token;
        }
      }
    },
    getGooglePlusToken: function() {
      return googlePlusToken;
    },
    saveUserDataFromSocialLogin: function(profile) {
      userSocialProfile = profile;
    },
    getUserDataFromSocialLogin: function() {
      return userSocialProfile;
    },
    getlogout: function() {
      var key;
      if(this.getCookie())
      {
        key = this.getCookie().access_token;
      }
      if(key)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
  };
});