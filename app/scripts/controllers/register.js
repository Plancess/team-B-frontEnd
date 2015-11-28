'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('RegisterCtrl', function (DataSource, cookieStore, $state, $scope) {

  	if(cookieStore.getCookie()){
  		$state.go('question');
  	}

  	$scope.register = function(){
  		console.log($scope.password +"==="+ $scope.cpassword);
  		if($scope.password === $scope.cpassword){
  			var data = {
		  		"username": $scope.username,
		  		"email": $scope.email,
		  		"first_name": $scope.name,
				"password": $scope.password
	  		};
  			DataSource.register(data).then(function(res){
  				login();
  			}, function(){
  				console.log("registration failed");
  			});
  		} else{
  			$scope.registerError = "Passwords do not match";
  		}
  		
  	}

  	function login(){
  		var data = {
	  		"username": $scope.email,
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
	  		$scope.registerError = "Invalid username password"
	  	});
  	}
  });
