// Ionic Starter App
// Ready for es2015 with babel

import AppRun from './config/app.run';
import AppConfig from './config/app.config';
// Import templates
import './config/app.templates';
// App functionality
import './dashboard';

// App modules
const modules = [
  'ionic',
  'templates',
  'app.dashboard'
];



angular.module('app', modules);

angular.module('app').config(AppConfig);

angular.module('app').run(AppRun);
