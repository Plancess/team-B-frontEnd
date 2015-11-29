'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:QuestionDetailsCtrl
 * @description
 * # QuestionDetailsCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('QuestionDetailsCtrl', function ($stateParams, DataSource, $scope, $state) {
	console.log("questionid", $stateParams.questionId);

	$scope.showCommentBox = false;
	
	$scope.showAnswerBox = false;

	this.tinymceOptions = {
    	onChange: function(e) {
      		
    	},
    	menubar: false
  	}

	DataSource.getQuestionDetails($stateParams.questionId).then(function(res){
		console.log("question details", res);
		$scope.question = res[0];
		$scope.showAnswerCommentBox = new Array($scope.question.answers.length);
		$scope.answerComment = new Array($scope.question.answers.length);
	}, function(){
		console.log("error while fetching question details");
	});

	$scope.toggleCommentBox = function(){
		$scope.showCommentBox = !$scope.showCommentBox;
	}

	$scope.toggleAnswerCommentBox = function(index){
		$scope.showAnswerCommentBox[index] = !$scope.showAnswerCommentBox[index];
	}

	$scope.postComment = function(){
		console.log($scope.questionComment);

		var data = {
			question : $stateParams.questionId,
			text : $scope.questionComment
		}
		DataSource.postComment(data).then(function(res){
			console.log("comment posted", res);
			$scope.showCommentBox = false;
			$state.reload();
		});
	}

	$scope.postAnswerComment = function(index, answerId){
		console.log("index", $scope.answerComment);
		var data = {
			answer : answerId,
			text : $scope.answerComment[index]
		}
		DataSource.postComment(data).then(function(res){
			console.log("comment posted", res);
			$scope.showAnswerCommentBox[index] = false;
			$state.reload();
		});
		
	}

	$scope.toggleAnswerBox = function(){
		$scope.showAnswerBox = !$scope.showAnswerBox;
	}

	$scope.answerCancel = function(){
		$scope.showAnswerBox = false;
	}

	$scope.postAnswer = function(){
		var data = {
			q_id : $stateParams.questionId,
			description : $scope.tinymceModelAnswer
		}
		DataSource.postAnswer(data).then(function(res){
			console.log("Answer posted");
			$route.reload();
			$state.reload();
		},function(){});
	}

	$scope.questionVoteUp = function(){
		console.log("question vote up");
		var data = {
			question : $stateParams.questionId,
			vote : 1
		}
		DataSource.postVote(data).then(function(res){
			console.log("questionVoteUp", res);
			$state.reload();
		});
	}

	$scope.questionVoteDown = function(){
		console.log("question vote down");
		var data = {
			question : $stateParams.questionId,
			vote : -1
		}
		DataSource.postVote(data).then(function(res){
			console.log("questionVoteDown", res);
			$state.reload();
		});
	}

	$scope.answerVoteUp = function(answerId){
		var data = {
			answer : answerId,
			vote : 1
		}
		DataSource.postVote(data).then(function(res){
			console.log(" answerVoteUp", res);
			$state.reload();
		});
	}

	$scope.answerVoteDown = function(answerId){
		var data = {
			answer : answerId,
			vote : -1
		}
		DataSource.postVote(data).then(function(res){
			console.log("answerVoteDown", res);
			$state.reload();
		});
	}

  });
