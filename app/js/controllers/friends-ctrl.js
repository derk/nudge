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
function($scope, Friends, $ionicPopup, $ionicLoading, BUDDI_UUIDS, $timeout, $q) {
  $scope.searchKey = "";
  $scope.friends = Friends.all();
  $scope.devices = [];
  $scope.doOnce = true;

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

  function showLoader() {
    $ionicLoading.show({
      template: 'Loading...<i class="icon ion-loading-c"></i>'
    });
  }

  $scope.onError = function(err) {
    console.log('Error: '+err);
  };

  $scope.onData = function(id, data) {
    console.log(data+' from '+id);
    var a = new Uint8Array(data);
  };

  var Peripheral = function (deviceId) {
    this.deviceId = deviceId;
  };

  Peripheral.prototype.connect = function() {
    var self = this;
    var q = $q.defer();
    console.log('Trying to connect to '+self.deviceId);
    ble.connect(self.deviceId, function(event) {
      q.notify('Connected. Reading DevInfo');
      ble.read(self.deviceId, '180A', '2A29', function(data) { $scope.onData(self.deviceId, data); }, $scope.onError);
      ble.notify(self.deviceId,
        BUDDI_UUIDS.service,
        BUDDI_UUIDS.notification,
        function(data) {
          $scope.onData(self.deviceId, data);
        }, function(err) {
          q.reject(err);
        }
      );
      q.resolve('Done');
    }, function(err) {
      q.reject(err);
    });

    return q.promise;
  };

  ionic.Platform.ready(function() {
    if($scope.doOnce) {
      $scope.doOnce = false;
      ble.isEnabled(
        function() {
          ble.scan([], 5, function(dev) { console.log(dev.name+' : '+dev.rssi+'dBm : '+dev.id+' : '+angular.equals(dev.id, 'D0:39:72:F1:E9:72')); }, function(err) { $scope.onError(err); });
          var band1 = new Peripheral('D0:39:72:F1:E9:72');
          band1.connect().then(function(msg) {
            console.log('Success: ' + msg);
            $scope.devices.push(band1);
          }, function(err) {
            console.log('Error: ' + err);
          }, function(update) {
            console.log('Notification: ' + update);
          });
          var band2 = new Peripheral('D0:39:72:F1:EA:81');
          band2.connect().then(function(msg) {
            console.log('Success: ' + msg);
            $scope.devices.push(band2);
          }, function(err) {
            console.log('Error: ' + err);
          }, function(update) {
            console.log('Notification: ' + update);
          });
          if($scope.devices.length > 0) {
            $scope.connectionCheck();
          }
        },
        function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Bluetooth disabled',
            template: 'Please enable bluetooth on your device before continuing'
          });
          alertPopup.then(function(res) {
            // if(ionic.Platform.isAndroid())
            ionic.Platform.exitApp();
          });
        }
      );
    } else {
      console.log('Skipping call to Platform.ready');
    }
  });

  $scope.connectionCheck = function() {
    $timeout(function() {
      angular.forEach($scope.devices, function(value, key) {
        ble.isConnected(value.deviceId,
          function() { console.log(value.deviceId + ' connected'); },
          function() { console.log(value.deviceId + ' has disconnected'); }
        );
      });
      $scope.connectionCheck();
    }, 2000);
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
