'use strict';

/**
 * @ngdoc overview
 * @name paqApp
 * @description
 * # paqApp
 *
 * Main module of the application.
 */
angular
  .module('paqApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'restangular',
    'ngTouch',
    'ngTouch',
    'ui.tinymce'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'views/register.html'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
      })
      .state('question', {
        url: '/question',
        controller: 'QuestionCtrl',
        templateUrl: 'views/question.html'
      })
      .state('questionDetails', {
        url: '/question/:questionId',
        controller: 'QuestionDetailsCtrl',
        templateUrl: 'views/questionDetail.html'
      })
      .state('ask', {
        url: '/ask',
        controller: 'AskCtrl',
        templateUrl: 'views/ask.html'
      });

      RestangularProvider.setBaseUrl("http://192.168.1.105:8080/");
  }]);
