'use strict';

/**
 * @ngdoc overview
 * @name ngDatepickerApp
 * @description
 * # ngDatepickerApp
 *
 * Main module of the application.
 */
angular
  .module('ngDatepickerApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
