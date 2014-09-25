/**
 * @ngdoc controller
 * @name SettingsCtrl
 * @module nudge
 * @description
 * Controller for the Settings Tab page
 */
NudgeModule
.controller('SettingsCtrl', [
  '$scope', 
  'Settings', 
function($scope, Settings) {
  $scope.settings = Settings.getSettings();

  // Watch deeply for settings changes, and save them
  // if necessary
  $scope.$watch('settings', function(v) {
    Settings.save();
  }, true);

  try {
    $scope.model = device.model;
    $scope.platform = device.platform;
    $scope.uuid = device.uuid;
    $scope.version = device.version;
  } catch (err) {
    console.log("Error " + err.message);
    alert("error " + err.$$failure.message);
  }

  $scope.networkStatus = navigator.connection.type;
  if ($scope.networkStatus !== Connection.UNKNOWN && $scope.networkStatus !== Connection.NONE) {
    $scope.connectionType = 'Online';
  }
  else if ($scope.networkStatus === Connection.UNKNOWN || $scope.networkStatus === Connection.NONE) {
    $scope.connectionType = 'Offline';
  }
  else {
    $scope.errorMsg = 'Error getting isOffline / isOnline methods';
  }
}]);