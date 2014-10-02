/**
 * @ngdoc controller
 * @name FriendsCtrl
 * @module nudge
 * @description
 * Controller for the Friends Tab page
 */
NudgeModule
.controller('FriendsCtrl', [
  '$scope',
  'Friends',
  '$ionicPopup',
  '$ionicLoading',
  'BUDDI_UUIDS',
  '$timeout',
  '$q',
  'Settings',
function($scope, Friends, $ionicPopup, $ionicLoading, BUDDI_UUIDS, $timeout, $q, Settings) {
  $scope.searchKey = "";
  $scope.friends = Friends.all();
  $scope.devices = [];
  $scope.doOnce = true;
  $scope.settings = Settings.getSettings();

  $scope.search = function () { };

  $scope.tglChange = function(device) {
    Friends.save($scope.friends);
  };

  // Triggered on a button click, or some other target
  $scope.showPopup = function($event, friend) {
    $event.preventDefault();
    $scope.send = function(col) {
      friend.colourName = col;
      switch(col) {
        case 'blue':
          //friend.colourName = '#4a87ee';
          friend.colourVal = 0x0000ff;
          break;
        case 'cyan':
          //friend.colourName = '#43cee6';
          friend.colourVal = 0x00ffff;
          break;
        case 'purple':
          //friend.colourName = '#8a6de9';
          friend.colourVal = 0xff00ff;
          break;
        case 'green':
          //friend.colourName = '#66cc33';
          friend.colourVal = 0x00ff00;
          break;
        case 'yellow':
          //friend.colourName = '#f0b840';
          friend.colourVal = 0xffff00;
          break;
        case 'red':
          //friend.colourName = '#ef4e3a';
          friend.colourVal = 0xff0000;
          break;
        default:
          //friend.colourName = '#fff';
          friend.colourVal = 0xffffff;
          break;
      }
      if(friend.id === 0) {
        $scope.sendColour($scope.devices[0].deviceId, friend.colourName);
      } else if(friend.id === 1) {
        $scope.sendColour($scope.devices[1].deviceId, friend.colourName);
      }
      myPopup.close();
    };
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'colour-popup.html',
      title: 'Select a colour',
      scope: $scope
    });
    //myPopup.then(function(res) { });
  };
  /*
  $scope.$watch('friends', function(newValue, oldValue) {
    if(newValue !== oldValue) {
      console.log('Old: '+oldValue+' New: '+newValue);
      //console.log('Band 1 changed to '+ $scope.friends[0].colourName);
      //console.log('Band 2 changed to '+ $scope.friends[1].colourName);
    }
  });
  */
  function showLoader() {
    $ionicLoading.show({
      template: 'Connecting...<i class="icon ion-loading-c"></i>',
      //duration: 10000
    });
  }

  $scope.onError = function(id, err) {
    $ionicLoading.hide();
    console.log('Error: '+err);
    if(err !== 'Disconnected') {
      var alertPopup = $ionicPopup.alert({
        title: 'Bluetooth Error!',
        template: 'Error: ' + err
      });
    } else {
      // TODO: add reconnect or at least remove from devices
      angular.forEach($scope.devices, function(value, key) {
        if(value.deviceId === id) {
          console.log(id + ' disconnected');
          value.isConnected = false;
        }
      });
    }
  };

  $scope.onData = function(id, data) {
    var a = new Uint8Array(data);
    if(a[0] === 0x10) {
      if(a[1] === 1) {
        console.log(id+' tried to set LED config ['+a[2]+' '+a[3]+' '+a[4]+']');
      } else if (a[1] === 2) {
        console.log(id+' sent ['+a[2]+' '+a[3]+' '+a[4]+']. Forwarding.');
        var destination;
        if($scope.devices[0].deviceId === id) {
          destination = $scope.devices[1].deviceId;
        } else {
          destination = $scope.devices[0].deviceId;
        }
        ble.write(destination, BUDDI_UUIDS.service, BUDDI_UUIDS.command, a.buffer,
        function() {
          console.log('Forwared to '+destination);
        }, function(err) { $scope.onError(id, err); });
      } else {
        console.log('Register '+a[1]+' not implemented. Ignoring. '+id);
      }
    } else {
      console.log('Unknown command ' + a[0] + ' sent from ' + id);
    }
  };

  $scope.sendColour = function(id, colour) {
    var a = new Uint8Array([16, 1, 255, 255, 255]);
    switch(colour) {
      case 'blue':   a[2]=0;a[3]=0; break;
      case 'cyan':   a[2]=0; break;
      case 'purple': a[3]=0; break;
      case 'green':  a[2]=0;a[4]=0; break;
      case 'yellow': a[4]=0; break;
      case 'red':    a[3]=0;a[4]=0; break;
    }
    ble.write(id, BUDDI_UUIDS.service, BUDDI_UUIDS.command, a.buffer,
      function() {
        console.log('LED set to '+colour+' on '+id);
      }, function(err) { $scope.onError(id, err); });
  };

  var Peripheral = function (deviceId) {
    this.deviceId = deviceId;
    this.isConnected = false;
  };

  Peripheral.prototype.connect = function() {
    var self = this;
    ble.connect(self.deviceId, function() {
      $ionicLoading.hide();
      console.log('Connected to '+self.deviceId);
      self.isConnected = true;
      if(self.deviceId === $scope.settings['band1Address']) {
        $scope.sendColour(self.deviceId, $scope.friends[0].colourName);
      } else {
        $scope.sendColour(self.deviceId, $scope.friends[1].colourName);
      }
      ble.notify(self.deviceId, BUDDI_UUIDS.service, BUDDI_UUIDS.notification,
        function(data) {
          console.log('Notifications enabled');
          $scope.onData(self.deviceId, data);
        }, function(err) { $scope.onError(self.deviceId,err); });
    }, function(err) { $scope.onError(self.deviceId, err); });
  };

  Peripheral.prototype.connected = function() {
    return this.isConnected;
    /*
    var id = this.deviceId;
    ble.isConnected(id, function() {
      console.log(id + ' is connected');
      return true;
    }, function() {
      console.log(id + ' is not connected');
      return false;
    });
    */
  };

  Peripheral.prototype.disconnect = function() {
    var self = this;
    ble.disconnect(self.deviceId, function() {
      self.isConnected = false;
    }, function(err) { $scope.onError(self.deviceId, err); });
  };

  ionic.Platform.ready(function() {
    ble.isEnabled(function() {
      showLoader();
      ble.scan([], 5, function(dev) { console.log(dev.name+' : '+dev.rssi+'dBm : '+dev.id); }, function(err) { $scope.onError(err); });

      var band1 = new Peripheral($scope.settings['band1Address']);
      $scope.devices.push(band1);
      var band2 = new Peripheral($scope.settings['band2Address']);
      $scope.devices.push(band2);
      $timeout(function() {
        $scope.connectionCheck();
      }, 6000);
    }, function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Bluetooth disabled',
        template: 'Please enable bluetooth on your device before continuing'
      });
      alertPopup.then(function(res) {
        // if(ionic.Platform.isAndroid())
        ionic.Platform.exitApp();
      });
    });
  });

  $scope.connectionCheck = function() {
    $timeout(function() {
      console.log($scope.devices.length + ' devices available');
      angular.forEach($scope.devices, function(value, key) {
        if(value.connected()) {
          console.log(value.deviceId + ' connected');
        } else {
          console.log(value.deviceId + ' has disconnected');
          value.connect();
        }
      });
      $scope.connectionCheck();
    }, 7000);
  };
}])

/**
 * @ngdoc controller
 * @name FriendDetailCtrl
 * @module nudge
 * @description
 * Controller for the Friends Details Tab page
 */
.controller('FriendDetailCtrl', [
  '$scope',
  '$stateParams',
  'Friends',
function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
}]);
