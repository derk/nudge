/**
 * @ngdoc service
 * @name Settings
 * @module nudge
 * @description
 * Settings Service
 */
NudgeModule
.constant('DEFAULT_SETTINGS', {
  'band1Address': 'D0:39:72:F1:E9:53',//'D0:39:72:F1:E9:72',
  'band2Address': 'D0:39:72:F1:E9:63'//'D0:39:72:F1:EA:81'
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
      return DEFAULT_SETTINGS;//_settings;
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
