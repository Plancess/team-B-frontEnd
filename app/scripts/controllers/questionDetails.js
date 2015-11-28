'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:QuestionDetailsCtrl
 * @description
 * # QuestionDetailsCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('QuestionDetailsCtrl', function ($stateParams, DataSource) {
	console.log("questionid", $stateParams.questionId);
	DataSource.getQuestionDetails($stateParams.questionId).then(function(res){
		console.log("question details", res);
	}, function(){
		console.log("error while fetching question details");
	});
  });
