/**
* app.routes Module
*
* Description
*/
export default angular.module('app.routes', []).config(config)

function config($stateProvider) {
  $stateProvider
    .state('app', {
      url: '',
      templateUrl: 'templates/app.html',
      controller: 'App.Controller as app'
    })
}
