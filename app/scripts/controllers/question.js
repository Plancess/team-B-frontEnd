'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('QuestionCtrl', function ($scope) {
    $scope.question = {
    	question: "Download file and display them in list in Android",
    	question_id: 1,
    	views: 999,
    	answer_count: 2,
    	question_vote_count: 0
    }
  });
