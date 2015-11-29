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

    DataSource.getAllTags().then(function(res){
      console.log('res', res);
      var tags = [];
      for(var i=0; i<=res.length-1; i++){
        tags.push({ text: res[i].title, id: res[i].id })
      }
      $scope.tagsData = tags;
    }, function(){

    })

    
    $scope.questionType = 1;

    /*$scope.loadTags = function($query){
      console.log("loadTags", $query);
    }*/

    $scope.postQuestion = function(){
      console.log('postQuestion', $scope.tinymceModel);
      var data = {
        title : $scope.title,
        description :  $scope.tinymceModel,
        tags : [],
        type: $scope.questionType
      };
      console.log('tags',$scope.tags);
      for(var i=0; i<=$scope.tags.length - 1; i++){
        data.tags.push($scope.tags[i].id);
      }
      console.log("data.tags", data.tags);
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
