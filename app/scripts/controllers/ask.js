'use strict';

/**
 * @ngdoc function
 * @name paqApp.controller:AskCtrl
 * @description
 * # AskCtrl
 * Controller of the paqApp
 */
angular.module('paqApp')
  .controller('AskCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ],
    this.tinymceOptions = {
    	onChange: function(e) {
      		
    	},
    	menubar: false
  	}
  });
