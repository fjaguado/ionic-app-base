angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('dashboard/dashboard.html','<ion-view view-title="{{app.title}}">\n  <ion-content class="has-header" ng-bind="$ctrl.text">\n  </ion-content>\n</ion-view>');
$templateCache.put('layout/app.html','<ion-nav-view></ion-nav-view>\n');}]);