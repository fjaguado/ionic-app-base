function DashboardConfig($stateProvider) {
  $stateProvider
    .state('app.dashboard', {
      url: '/',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: '$ctrl'
    })
}

export default DashboardConfig;

