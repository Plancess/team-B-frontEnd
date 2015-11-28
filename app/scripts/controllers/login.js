'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('LoginCtrl',function (DataSource, cookieStore, $state, $scope) {

  	if(cookieStore.getCookie()){
  		$state.go('question');
  	}

  	$scope.login = function(){
  		var data = {
	  		"username": $scope.username,
			"password": $scope.password
	  	};
  		DataSource.getAccessToken(data).then(function(res){
	  		console.log("login succes",res);
	  		cookieStore.saveToCookie(res);
	  		DataSource.getUserIdData().then(function(res){
	  			console.log("user data", res);
	  			cookieStore.saveUserToCookie(res);
	  			$state.go('question');
	  		})
	  	}, function(){
	  		console.log("login failure");
	  		$scope.loginError = "Invalid username password"
	  	});
  	}
  	
  });
