/**
 * @ngdoc service
 * @name Settings
 * @module nudge
 * @description
 * Settings Service
 */
NudgeModule
.factory('Settings', [
  '$rootScope',
  '$window',
function($rootScope, $window) {
  var _settings = {};
  try {
    _settings = JSON.parse($window.localStorage.getItem('settings'));
  } catch(e) {
  }

  // Just in case we have new settings that need to be saved
  if(_settings === null) {
    if(ionic.Platform.isAndroid()) {
      console.log('No settings found. Using default Android');
      _settings = {
        'band1Address': 'D0:39:72:F1:E9:53',//'D0:39:72:F1:E9:72',
        'band2Address': 'D0:39:72:F1:E9:63'//'D0:39:72:F1:EA:81'
      };
    } else {
      console.log('No settings found. Using default iOS');
      _settings = {
        'band1Address': 'F58E83E1-AE93-08CA-FA04-11FFFF18A3D3',
        'band2Address': '8DC4981C-1429-A1AE-1552-F126F9DFC407'
      };
    }
    $window.localStorage.setItem('settings', JSON.stringify(_settings));
  }

  return {
    getSettings: function() {
      return _settings;
    },
    // Save the settings to localStorage
    save: function() {
      $window.localStorage.setItem('settings', JSON.stringify(_settings));
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
    }
  };
}]);
