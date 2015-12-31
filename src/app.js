// Ionic Starter App
// Ready for es2015 with babel

import config from './config'
import routes from './routes'
import controllers from './controllers'

angular.module('app', [
  'ionic',
  config.name,
  routes.name,
  controllers.name
])
