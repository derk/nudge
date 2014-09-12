(function () {

  'use strict';

  /**
   * @class SettingsCtrl
   * @classdesc Settings Controller
   * @ngInject
   */
  function SettingsCtrl ($scope, Settings, $cordovaDevice, $cordovaNetwork) {
    $scope.settings = Settings.getSettings();

    // Watch deeply for settings changes, and save them
    // if necessary
    $scope.$watch('settings', function(v) {
      Settings.save();
    }, true);

    try {
      $scope.available = $cordovaDevice.getDevice().available;
      $scope.device = $cordovaDevice.getDevice();
      $scope.cordova = $cordovaDevice.getCordova();
      $scope.model = $cordovaDevice.getModel();
      $scope.platform = $cordovaDevice.getPlatform();
      $scope.uuid = $cordovaDevice.getUUID();
      $scope.version = $cordovaDevice.getVersion();
    } catch (err) {
      console.log("Error " + err.message);
      alert("error " + err.$$failure.message);
    }

    $scope.networkType = $cordovaNetwork.getNetwork();

    if ($cordovaNetwork.isOnline() == true) {
      $scope.connectionType = 'Online';
    }
    else if ($cordovaNetwork.isOffline() == true) {
      $scope.connectionType = 'Offline';
    }
    else {
      $scope.errorMsg = 'Error getting isOffline / isOnline methods';
    }
  }

  SettingsCtrl.$inject = ['$scope', 'Settings', '$cordovaDevice', '$cordovaNetwork'];

  angular
    .module('nudge')
    .controller('SettingsCtrl', SettingsCtrl);

})();
