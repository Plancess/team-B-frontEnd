'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('QuestionCtrl', function ($scope, DataSource) {
	DataSource.getQuestions().then(function(res){
		console.log('questions', res);
		$scope.questions = res;
	}, function(){
		console.log('error while fetching questions');
	});
  });
