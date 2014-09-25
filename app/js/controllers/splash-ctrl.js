/**
 * @ngdoc controller
 * @name SplashCtrl
 * @module nudge
 * @description
 * Controller for the Splash Screen
 */
NudgeModule
.controller('SplashCtrl', [
  '$timeout',
  '$state', 
function($timeout, $state) {
  var t = $timeout(function() {
    $state.go('tab.colour');
  }, 2000);
  //$timeout.cancel(t);
}]);