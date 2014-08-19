angular.module('nudge.services', [])

.factory('Colours', function() {
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
})

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
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
})

.constant('DEFAULT_SETTINGS', {
  'band1Address': 'D0:39:72:F1:E9:72',
  'band2Address': 'D0:39:72:F1:EA:81'
})

.factory('Settings', function($rootScope, DEFAULT_SETTINGS) {
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
});
