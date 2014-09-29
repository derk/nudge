/**
 * nudge - A Nudge by Buddi
 * @version v1.0.0 (c) 2014
 * @author Richard Osterloh <richard.osterloh@gmail.com>
 * @link http://www.buddi.co.uk
 */
(function() {
var NudgeModule = angular.module('nudge', ['ionic']), /* removed for now 'ngResource', 'ngCordova'*/
  extend = angular.extend,
  forEach = angular.forEach,
  isDefined = angular.isDefined,
  isString = angular.isString;
  
  NudgeModule
  .run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }]);
  
  NudgeModule
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
  
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "tabs.html"
      })
  
      // Each tab has its own nav history stack:  
      .state('tab.colour', {
        url: '/colour',
        views: {
          'tab-colour': {
            templateUrl: 'tab-colour.html',
            controller: 'ColourCtrl'
          }
        }
      })  
      .state('tab.friends', {
        url: '/friends',
        views: {
          'tab-friends': {
            templateUrl: 'tab-friends.html',
            controller: 'FriendsCtrl'
          }
        }
      })
      .state('tab.friend-detail', {
        url: '/friend/:friendId',
        views: {
          'tab-friends': {
            templateUrl: 'friend-detail.html',
            controller: 'FriendDetailCtrl'
          }
        }
      })
  
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'tab-settings.html',
            controller: 'SettingsCtrl'
          }
        }
      });
  
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/colour');
  
  }]);
/**
 * @ngdoc service
 * @name Colours
 * @module nudge
 * @description
 * Colours Service
 */
NudgeModule
.factory('Colour', [
function() {
  var colours = [
    { id: 0, name: 'Blue',    value: 0x0000FF, style: 'bar-positive'  },
    { id: 1, name: 'Green',   value: 0x00FF00, style: 'bar-balanced'  },
    { id: 2, name: 'Red',     value: 0xFF0000, style: 'bar-assertive' },
    { id: 3, name: 'Purple',  value: 0xFF00FF, style: 'bar-royal'     },
    { id: 4, name: 'Yellow',  value: 0xFFFF00, style: 'bar-energized' },
    { id: 5, name: 'Cyan',    value: 0x00FFFF, style: 'bar-calm'      }
  ];

  return {
    all: function() {
      return colours;
    },
    get: function(cId) {
      return colours[cId];
    }
  }
}]);
/**
 * @ngdoc service
 * @name $cordovaBleCentral
 * @module nudge
 * @description
 * Cordova wrapper for the Ble Central Plugin
 */
NudgeModule
.factory('$cordovaBleCentral', [
  '$q', 
  '$window',
function($q, $window) {
  var promise_f = function () {
    var q = $q.defer();

    // callbacks
    var success = function (success) {
      q.resolve(success);
    };
    var failure = function (failure) {
      q.reject(failure);
    };

    // get func and set args
    var f_name = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    args.push(success);
    args.push(failure);

    $window.ble[f_name].apply(this, args);

    return q.promise;
  };

  return {
    scan: function (services, seconds) {
      if ($window.device.platform == "iOS") {
        return promise_f('scan', services, seconds);
      } else {
        return promise_f('scan', [], seconds);
      }
    },
    connect: function (macAddress) {
      return promise_f('connect', macAddress);
    },
    disconnect: function () {
      return promise_f('disconnect');
    },
    read: function (device_id, service_uuid, characteristic_uuid) {
      return promise_f('read', device_id, service_uuid, characteristic_uuid);
    },
    write: function (device_id, service_uuid, characteristic_uuid, value) {
      return promise_f('write', device_id, service_uuid, characteristic_uuid, value);
    },
    writeCommand: function (device_id, service_uuid, characteristic_uuid, value) {
      return promise_f('writeCommand', device_id, service_uuid, characteristic_uuid, value);
    },
    notify: function (device_id, service_uuid, characteristic_uuid) {
      return promise_f('notify', device_id, service_uuid, characteristic_uuid);
    },
    indicate: function (device_id, service_uuid, characteristic_uuid) {
      return promise_f('indicate', device_id, service_uuid, characteristic_uuid);
    },
    isEnabled: function () {
      return promise_f('isEnabled');
    },
    isConnected: function (device_id) {
      return promise_f('isConnected', device_id);
    }
  };
}]);

/**
 * @ngdoc service
 * @name Friends
 * @module nudge
 * @description
 * Friends Service
 */
NudgeModule
.factory('Friends', [
function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    {"id": 0, "firstName": "James", "lastName": "King", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "img": "James_King.jpg", "twitterId": "@fakejking", enabled: true},
    {"id": 1, "firstName": "Julie", "lastName": "Taylor", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "img": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", enabled: true},
    {"id": 2, "firstName": "Eugene", "lastName": "Lee", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "img": "Eugene_Lee.jpg", "twitterId": "@fakeelee", enabled: true},
    {"id": 3, "firstName": "John", "lastName": "Williams", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "img": "John_Williams.jpg", "twitterId": "@fakejwilliams", enabled: true},
    {"id": 4, "firstName": "Ray", "lastName": "Moore", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "img": "Ray_Moore.jpg", "twitterId": "@fakermoore", enabled: true},
    {"id": 5, "firstName": "Paul", "lastName": "Jones", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "img": "Paul_Jones.jpg", "twitterId": "@fakepjones", enabled: true},
    {"id": 6, "firstName": "Paula", "lastName": "Gates", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "img": "Paula_Gates.jpg", "twitterId": "@fakepgates", enabled: true},
    {"id": 7, "firstName": "Lisa", "lastName": "Wong", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "img": "Lisa_Wong.jpg", "twitterId": "@fakelwong", enabled: true},
    {"id": 8, "firstName": "Gary", "lastName": "Donovan", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "img": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", enabled: true},
    {"id": 9, "firstName": "Kathleen", "lastName": "Byrne", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "img": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", enabled: true},
    {"id": 10, "firstName": "Amy", "lastName": "Jones", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "img": "Amy_Jones.jpg", "twitterId": "@fakeajones", enabled: true},
    {"id": 11, "firstName": "Steven", "lastName": "Wells", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "img": "Steven_Wells.jpg", "twitterId": "@fakeswells", enabled: true}
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
}]);
/**
 * @ngdoc service
 * @name localstorage
 * @module nudge
 * @description
 * localstorage Service
 */
NudgeModule
.factory('localstorage', [
  '$window',
function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

/**
 * @ngdoc service
 * @name Peripheral
 * @module nudge
 * @description
 * Peripheral Service
 */
NudgeModule
.constant('BUDDI_UUIDS', {
  'service': '92d7dc20-ba55-4df8-84b1-ad8af6e1ea4a',
  'command': '92d7dc20-bb01-4df8-84b1-ad8af6e1ea4a',
  'notification': '92d7dc20-bb02-4df8-84b1-ad8af6e1ea4a'
})
.factory('Peripheral', [
  'BUDDI_UUIDS', 
  '$q',
function(BUDDI_UUIDS, $q) {
  var Peripheral = function (deviceId) {
    this.deviceId = deviceId;
    this.deviceInfo = {
        manufacturer: '',
        model: '',
        serial: '',
        hardware: '',
        firmware: '',
        software: ''
    };
  };
  
  Peripheral.prototype.connect = function () {
    ble.connect(this.deviceId, this.onConnect.bind(this), this.onError);
  };
  
  Peripheral.prototype.onError = function (error) {
    console.log('Error: ' + error + ' (' + this.deviceId + ')');
  };
  
  Peripheral.prototype.onConnect = function (event) {
    this.readDeviceInfo();
    //this.readBatteryLevel();
    // keep calling the battery level so we know multiple connections work
    //setInterval(this.readBatteryLevel.bind(this), 10000);
  };

  Peripheral.prototype.readDeviceInfo = function() {
    var q = $.defer();
    
    //ble.read(this.deviceId, '180A', '2A29', this.onReadDeviceInfo.bind(this), this.onError);
    ble.read(this.deviceId, '180A', '2A29', function(data) { this.deviceInfo.manufacturer = data; }, this.onError);
    ble.read(this.deviceId, '180A', '2A24', function(data) { this.deviceInfo.model = data; }, this.onError);
    ble.read(this.deviceId, '180A', '2A25', function(data) { this.deviceInfo.serial = data; }, this.onError);
    ble.read(this.deviceId, '180A', '2A27', function(data) { this.deviceInfo.hardware = data; }, this.onError);
    ble.read(this.deviceId, '180A', '2A26', function(data) { this.deviceInfo.firmware = data; }, this.onError);
    ble.read(this.deviceId, '180A', '2A28', function(data) { this.deviceInfo.software = data; q.resolve(); }, function() { this.onError; q.reject(); });
    
    return q.promise;
  };

  Peripheral.prototype.onReadDevice = function(data) {
      console.log(data);
      var message;
      var a = new Uint8Array(data);
  };

  Peripheral.prototype.disconnect = function () {
    ble.disconnect(this.deviceId, function() { console.log(this.deviceId + ' disconnected'); }, this.onError);
  };
  
  return Peripheral;
}]);
/**
 * @ngdoc service
 * @name Settings
 * @module nudge
 * @description
 * Settings Service
 */
NudgeModule
.constant('DEFAULT_SETTINGS', {
  'band1Address': 'D0:39:72:F1:E9:72',
  'band2Address': 'D0:39:72:F1:EA:81'
})
.factory('Settings', [
  '$rootScope', 
  'DEFAULT_SETTINGS',
function($rootScope, DEFAULT_SETTINGS) {
  var _settings = {};
  try {
    _settings = JSON.parse(window.localStorage['settings']);
  } catch(e) {
  }

  // Just in case we have new settings that need to be saved
  _settings = angular.extend({}, DEFAULT_SETTINGS, _settings);

  if(!_settings) {
    window.localStorage['settings'] = JSON.stringify(_settings);
  }

  var obj = {
    getSettings: function() {
      return _settings;
    },
    // Save the settings to localStorage
    save: function() {
      window.localStorage['settings'] = JSON.stringify(_settings);
      $rootScope.$broadcast('settings.changed', _settings);
    },
    // Get a settings val
    get: function(k) {
      return _settings[k];
    },
    // Set a settings val
    set: function(k, v) {
      _settings[k] = v;
      this.save();
    },

    getBand1Address: function() {
      return _settings['band1Address'];
    }
  }

  // Save the settings to be safe
  obj.save();
  return obj;
}]);
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
  };

  function addErrorMessage(m) {
    $scope.logs.push({message: m, type: 'error', color: 'rgb(255, 76, 76)'});
  };

  function onDiscoverDevice(device) {
    //if (device.name.match(/Buddi/i)) {
      var m = device.name + ': ' + device.id + ' RSSI:' + device.rssi;
      $scope.logs.push({message: m, type: 'connect', color: 'rgb(200, 200, 200)', data: device.id});
    //}
    $ionicLoading.hide();
  };

  function handleError(reason) {
    addErrorMessage('ERROR: ' + reason);
    $ionicLoading.hide();
  };

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
  }

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
  }
  
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
function($scope, Friends) {
  $scope.searchKey = "";

  $scope.clearSearch = function () {
    $scope.searchKey = "";
    $scope.friends = Friends.all();
  }

  $scope.search = function () {

  }

  $scope.friends = Friends.all();
  
  $scope.tglChange = function(device) {
    
  }
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
})();