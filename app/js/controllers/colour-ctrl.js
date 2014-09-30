/**
 * @ngdoc controller
 * @name ColourCtrl
 * @module nudge
 * @description
 * Controller for the Colours Tab page
 */
NudgeModule
.controller('ColourCtrl', [
  '$scope',
  'Settings',
  'Peripheral',
  '$ionicLoading',
function($scope, Settings, Peripheral, $ionicLoading) {
  $scope.debug = true;
  $scope.logs = [];
  $scope.devices = [];

  function addSuccessMessage(m) {
    $scope.logs.push({message: m, type: 'success', color: 'rgb(45, 231, 112)'});
  }

  function addErrorMessage(m) {
    $scope.logs.push({message: m, type: 'error', color: 'rgb(255, 76, 76)'});
  }

  function onDiscoverDevice(device) {
    //if (device.name.match(/Buddi/i)) {
      var m = device.name + ': ' + device.id + ' RSSI:' + device.rssi;
      $scope.logs.push({message: m, type: 'connect', color: 'rgb(200, 200, 200)', data: device.id});
    //}
    $ionicLoading.hide();
  }

  function handleError(reason) {
    addErrorMessage('ERROR: ' + reason);
    $ionicLoading.hide();
  }

  function showLoader() {
    $ionicLoading.show({
      template: 'Loading...<i class="icon ion-loading-c"></i>'
    });
  }

  $scope.startScan = function () {
    showLoader();
    //$cordovaBleCentral.scan([], 5).then(onDiscoverDevice, handleError);
    ble.scan([], 5, onDiscoverDevice, handleError);
    //$ionicLoading.hide();
  };

  $scope.connectDevice = function(mac) {
  /*
    showLoader();
    $cordovaBleCentral.connect(mac).then(function() {
      addSuccessMessage('Connected to ' + mac);
      $cordovaBleCentral.notify(mac, buddi.serviceUUID, buddi.notifyChar).then(function(buffer) {
        var data = new Uint8Array(buffer);
        var message = "";

        if (data[0] === 1 && data[1] === 1) { // module = 1, opscode = 1
          if (data[2] === 1) { // button state
            message = "Button pressed";
          } else {
            message = "Button released";
          }
        }
      }, handleError);
      $ionicLoading.hide();
    }, handleError);
    //ble.connect(mac, function() { addSuccessMessage('Connected to ' + mac); $ionicLoading.hide(); }, handleError);
    */
  };

  /**
   * @ngdoc method
   * @name ionic.Platform.ready
   * @description
   * Trigger a callback once the device is ready,
   * or immediately if the device is already ready.
   * @param {function=} callback The function to call.
   */
  ionic.Platform.ready(function() {
    ble.isEnabled(
      function() {
        var band1 = new Peripheral('D0:39:72:F1:E9:72');
        $scope.devices.push(band1);
        band1.connect();
      },
      function() {
        addErrorMessage('Bluetooth is disabled');
      }
    );
  });

}]);
