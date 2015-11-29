'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('LogoutCtrl',function (DataSource, cookieStore, $state, $scope, $rootScope) {

  	cookieStore.clearCookie();
  	$rootScope.isLogged = false;
  	$state.go('home');
  });
