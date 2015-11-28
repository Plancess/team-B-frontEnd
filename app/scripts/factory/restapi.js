'use strict';

/**
 * @ngdoc service
 * @name paqApp.RestAPI
 * @description
 * # RestAPI
 * Factory in the paqApp.
 */
angular.module('paqApp')
  .factory('RestAPI', ['Restangular', 'cookieStore', '$window', '$http', '$q', function (Restangular, cookieStore, $window, $http, $q, ENV) {

    var token,cookieData;
    var client_id = "cowkBqV9OgZzuIZUpD28J649QVb3dAsWnBXUTfUd";
    var client_secret = "3zvNr5XKVfsBESBjuC15dZdrxqzIheifpKF3hiEAXnoxTfGQYKyr9gH4hzsxYDbKQyZeMjwfE1WmmdjaO9NAJlfJpZD21aT0QkhnX7mqy83uymTN1Yn9X8nXDnzaR8EC";
    return Restangular.withConfig(function(c) {
      
      c.setRequestSuffix('/');
      c.addFullRequestInterceptor(function(element, operation, route, url, headers) {
        if((route === "users" || route === "auth/token") && operation === "post")
        {
            headers.Authorization = '';
        }
        else
        {
          cookieData = cookieStore.getCookie();
          if(cookieData) {
            console.log('cookie');
              token = cookieData.token_type + " " + cookieData.access_token;
              headers.Authorization = token;
          } /*else {
            $window.location.href = '/#login';
            //$window.location.href = '../';

          }*/
        }
        if( (operation === "patch" || operation === "post") && !headers['Content-Type'] ){
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
          console.log(asdf);
        }
        if(headers['Content-Type'] === 'undefined') 
        {
          headers['Content-Type'] = undefined;
        }

      });

      var refreshAccessToken = function () {
        var deferred = $q.defer();
        cookieData = cookieStore.getCookie();
        if (cookieData.refresh_token) {
          var data = {
              'client_id' : client_id,
              'client_secret' : client_secret,
              'grant_type' : 'refresh_token',
              'refresh_token' : cookieData.refresh_token
          };
            //your code to be executed after 2 seconds
            Restangular.all('/auth/token/').customPOST($.param(data), undefined, undefined,{"Content-Type": "application/x-www-form-urlencoded"}).then(function (res){
                cookieStore.saveToCookie(res, cookieData.user_id);
                deferred.resolve();
            },function(error){
                deferred.reject();
            });
        }

        return deferred.promise;
      };
      c.setErrorInterceptor(function(response, deferred, responseHandler) {
        if( response.status === 401 && response.config.url.indexOf("auth/token") === -1 && response.config.method !== 'POST')
        {
          refreshAccessToken().then(function(data) {
            cookieData = cookieStore.getCookie();
            if(cookieData)
            {
              response.config.headers['Authorization'] = cookieData.token_type + " " + cookieData.access_token;
              $http(response.config).then(responseHandler, deferred.reject);  
            }
          },function(err) {
              cookieStore.clearCookie();
              $window.location.href = '/#login';
          });
          return false;
        }
        return true;
      });
    });
  }]);