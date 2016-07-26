function AppConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'layout/app.html'
    });

  $urlRouterProvider.otherwise('/');
}

export default AppConfig;
