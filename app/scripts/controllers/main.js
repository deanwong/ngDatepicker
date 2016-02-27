'use strict';

/**
 * @ngdoc function
 * @name ngDatepickerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngDatepickerApp
 */
angular.module('ngDatepickerApp')
  .controller('MainCtrl', function () {
  	var main = this;
    main.arrivalDate = moment().add(1, 'days').format('YYYY-MM-DD');
    main.departureDate = moment().add(2, 'days').format('YYYY-MM-DD');
  });
