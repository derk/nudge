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
