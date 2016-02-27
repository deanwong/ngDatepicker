/**
 * Created by wangding on 5/27/15.
 */
'use strict';

(function (app) {

  app.directive('datepicker', function ($parse) {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      compile: function (element, attrs, transcludeFn) {
        var startModelAccessor = $parse(attrs.ngStartModel);
        var endModelAccessor = $parse(attrs.ngEndModel);
        var start_selector = $(element).attr('start-date') || 'J_CheckIn';
        var end_selector = $(element).attr('end-date') || 'J_CheckOut';

        return function (scope, element, attrs, controller) {

          transcludeFn(scope, function(clone) {
            element.replaceWith(clone);
          });

          var S = KISSY;
          S.Config.debug = false;

          S.config({
            packages: [
              {
                name: 'kg/calendar/2.0.2',
                path: '../controls/datepicker/build',
                charset: 'utf-8',
                ignorePackageNameInUri: true
              }
            ]
          });

          if (S.Config.debug) {
            var srcPath = '../controls/datepicker/src';
            S.config({
              packages: [
                {
                  name: 'kg/calendar/2.0.2',
                  path: srcPath,
                  charset: 'utf-8',
                  ignorePackageNameInUri: true
                }
              ]
            });
          }

          S.use('kg/calendar/2.0.2/index', function (S, Calendar) {
            var $ = S.all;


            // clear all calendar-bounding-box
            //$('.calendar-bounding-box').remove();

            /**
             * 酒店日历实例
             *
             * 入住可选时段：今天起90天
             * 离店可选时段：入住时间+28天
             */
            var maxCheckOut = 90;
            var maxInterval = 28;

            var calendar = new Calendar({
              afterDays: maxCheckOut,
              triggerNode: '#' + start_selector,
              finalTriggerNode: '#' + end_selector
            });

            var maxCheckoutDate = calendar.get('maxDate');
            var limit;

            calendar.on('show', function (e) {
              switch (e.node.attr('id')) {
                case start_selector:
                  this.set('minDate', new Date());
                  this.set('afterDays', maxCheckOut);
                  this.render();
                  break;
                case end_selector:
                  this.set('minDate', this.get('startDate') || new Date());
                  this.set('afterDays', Math.min(maxInterval, Calendar.DATE.differ(this.get('minDate'), maxCheckoutDate) + 1));
                  this.render();
                  break;
              }
            });

            var currentNodeId;
            calendar.on('hide', function (e) {
              currentNodeId = e.node.attr('id');
            });
            calendar.on('dateclick', function (e) {
              if (currentNodeId === start_selector) {
                scope.$apply(function (scope) {
                  startModelAccessor.assign(scope, e.date);
                });
              } else if (currentNodeId === end_selector) {
                scope.$apply(function (scope) {
                  endModelAccessor.assign(scope, e.date);
                });
              }
            });

          });


          scope.$watch(startModelAccessor, function (val) {
            $('#'+start_selector).val(val);
          });

          scope.$watch(endModelAccessor, function (val) {
            $('#'+end_selector).val(val);
          });

        };

      }
    };
  });

}(angular.module('ngDatepickerApp')));
