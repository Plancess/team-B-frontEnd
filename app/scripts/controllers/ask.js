'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:AskCtrl
 * @description
 * # AskCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('AskCtrl', function ($scope, DataSource, cookieStore, $state) {
    if(!cookieStore.getCookie()){
      $state.go('login');
    }
    this.tinymceOptions = {
    	onChange: function(e) {
      		
    	},
    	menubar: false
  	}

    $scope.postQuestion = function(){
      console.log('postQuestion', $scope.tinymceModel);
      var data = {
        title : $scope.title,
        description :  $scope.tinymceModel,
        tags : [],
        type: 0
      };
      DataSource.askQuestion(data).then(function(res){
        console.log("question posted");
        $state.go('questionDetails', {questionId: res.id});
      }, function(){
        console.log("failure");
      });
    }

    $scope.cancel = function(){
      console.log('cancel');
      $state.go('question');
    }
  });
