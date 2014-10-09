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
  '$ionicPopup',
  '$timeout',
function($scope, Settings, $ionicPopup, $timeout) {
  $scope.settings = Settings.getSettings();
  $scope.scanning = false;
  $scope.devices = [];
  $scope.scanner = null;
  $scope.band1Select = true;
  $scope.android = ionic.Platform.isAndroid();

  // Watch deeply for settings changes, and save them
  // if necessary
  $scope.$watch('settings', function(v) {
    Settings.save();
  }, true);

  ionic.Platform.ready(function() {
    try {
      $scope.model = device.model;
      $scope.platform = device.platform;
      $scope.uuid = device.uuid;
      $scope.version = device.version;
    } catch (err) {
      console.log('Error ' + err.message);
    }

    $scope.networkStatus = navigator.connection.type;
    if ($scope.networkStatus !== Connection.UNKNOWN && $scope.networkStatus !== Connection.NONE) {
      $scope.connectionType = 'Online';
    } else if ($scope.networkStatus === Connection.UNKNOWN || $scope.networkStatus === Connection.NONE) {
      $scope.connectionType = 'Offline';
    } else {
      $scope.errorMsg = 'Error getting isOffline / isOnline methods';
    }
  });

  $scope.setAddress = function(band) {
    if(band === 1) {
      $scope.band1Select = true;
    } else if (band === 2) {
      $scope.band1Select = false;
    }

    $scope.goScan = function() {
      $scope.scanning = true;
      $scope.devices = [];
      ble.scan([], 5, function(dev) { $scope.devices.push(dev); }, function(err) { console.log(err); });
      $timeout(function() { $scope.scanning = false; }, 5000);
    };

    var scanPopup = $ionicPopup.show({
      templateUrl: 'ble-popup.html',
      title: 'Select available devices',
      scope: $scope
    });

    $scope.setValue = function(dev) {
      if($scope.band1Select) {
        $scope.settings.band1Address = dev.id;
      } else {
        $scope.settings.band2Address = dev.id;
      }
      Settings.save();
      scanPopup.close();
    };

    $scope.goScan();
  };
}]);
