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
  'Peripheral',
  '$ionicPopup',
  '$ionicLoading',
function($scope, Friends, Peripheral, $ionicPopup, $ionicLoading) {
  $scope.searchKey = "";
  $scope.friends = Friends.all();
  $scope.devices = [];

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

  ionic.Platform.ready(function() {
    ble.isEnabled(
      function() {
        var band1 = new Peripheral('D0:39:72:F1:E9:72');
        $scope.devices.push(band1);
        band1.connect().then(function(msg) {
          console.log('Success: ' + msg);
        }, function(err) {
          console.log('Error: ' + err);
        }, function(update) {
          console.log('Notification: ' + update);
        });
      },
      function() {
        $ionicPopup.alert({
          title: 'Bluetooth disabled',
          template: 'Please enable bluetooth on your device before continuing'
        });
      }
    );
  });
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
