/**
 * @ngdoc controller
 * @name OldColourCtrl
 * @module nudge
 * @description
 * Controller for the Colours Tab page using BluetoothLE module
 */
NudgeModule
.controller('OldColourCtrl', [
  '$scope', 
  'Colours', 
  '$ionicPopup',
function ($scope, Colours, $ionicPopup) {
  $scope.debug = true;
  $scope.logs = [];
  $scope.initializeBluetooth = false;
  $scope.scanning = false;

  var scanTimer = null;

  function addSuccessMessage(m) {
    $scope.$apply(function(){
      $scope.logs.push({message: m, type: 'success', color: 'rgb(45, 231, 112)'})
    });
  }

  function addConnectMessage(m, connectEvent) {
    $scope.$apply(function(){
      $scope.logs.push({message: m, type: 'connect', color: 'rgb(45, 231, 112)', connectEvent: connectEvent})
    });
  }

  function addErrorMessage(m) {
    $scope.$apply(function(){
      $scope.logs.push({message: m, type: 'error', color: 'rgb(255, 76, 76)'})
    });
  }

  function scanTimeout() {
    console.log("Scanning time out, stopping");
    $scope.stopScan();
  }

  $scope.startScan = function () {
    if ($scope.initializeBluetooth) {
      bluetoothle.startScan(
        function (a) {
          console.log('scan success', a);
          if (a.status == 'scanStarted') {
            addSuccessMessage('Scan Started');
            $scope.scanning = true;
            scanTimer = setTimeout(scanTimeout, 10000);
          } else {
            addConnectMessage('Discovered: '+ a.name, a);
          }
        },
        function (a) {
          console.log('scan ERROR', a);
          addErrorMessage('Scan ERROR');
        }
      );
    } else {
      addErrorMessage('Bluetooth NOT INITIALIZED');
    }
  };

  $scope.discover = function() {
    if (window.device.platform == "iOS") {
      bluetoothle.services(
        function(a) {
          console.log('Discover success', a);
          addSuccessMessage('Discover to '+ a.name);
        },
        function(a) {
          addErrorMessage('Discover ERROR: '+  a);
        },
        {"serviceUuids":["92d7dc20-ba55-4df8-84b1-ad8af6e1ea4a"]} // [] no filter
      );
    } else if (window.device.platform == "Android") {
      bluetoothle.discover(
        function(a) {
          console.log('Discover success', a);
          addSuccessMessage('Discover to '+ a.name);
        },
        function(a) {
          addErrorMessage('Discover ERROR: '+  a);
        }
      );
    } else {
      addErrorMessage('Unsupported platform. Cannot do service scan.');
    }
  };

  $scope.connectDevice = function (connectEvent) {
    if (connectEvent.address != undefined) {
      var device = connectEvent.address;
      // CONNECT TO DEVICE
      bluetoothle.connect(
        function (a) {
          console.log('connect success', a);
          addSuccessMessage('Connect to '+ a.name+': ' + a.status);
          $scope.discover();
        },
        function (a) {
          console.log('connect ERROR', a);
          addErrorMessage('Connect ERROR');
        },
        {"address": device}
      );
    } else {
      addErrorMessage('ConnectEvent: address not defined');
    }
  };

  $scope.stopScan = function () {
    if ($scope.initializeBluetooth) {
      bluetoothle.stopScan(
        function (a) {
          $scope.scanning = false;
          console.log('stop scan success', a);
          addSuccessMessage('Scan success');
        },
        function (a) {
          console.log('stop scan ERROR', a);
          addErrorMessage('Stop scan ERROR');
        }
      );
    } else {
      addErrorMessage('Bluetooth NOT INITIALIZED');
    }
  };

  if (typeof bluetoothle != 'undefined') {
    bluetoothle.initialize(
      function (a) {
        console.log('initialize success', a);
        addSuccessMessage('Initialize success');
        $scope.$apply(function(){
          $scope.initializeBluetooth = true;
        });
      },
      function (a) {
        console.log('initialize ERROR', a);
        addErrorMessage('Initialize ERROR');
        $scope.$apply(function(){
          $scope.initializeBluetooth = false;
        });
      },
      {"request":true}
    );
  } else {
    addErrorMessage('Bluetooth IS NOT defined');
  }

  $scope.colours = Colours.all();

  $scope.change = function(colour) {
    //
  };

  $scope.send = function(value) {
    $ionicPopup.alert({
      title: 'Sending colour',
      template: '{{colours[value].name}} sent to band'
    }).then(function(res) {
      console.log('Colour ' + $scope.colours[value].name + ' sent');
    });
  };
}]);
