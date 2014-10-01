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

  Peripheral.prototype.connect = function() {
    var self = this;
    var q = $q.defer();

    ble.isEnabled(
      function() {
        var available = [];
        q.notify('Scanning for '+self.deviceId);
        ble.scan([], 5, function(device) {
          q.notify(device.id + ' : ' + device.rssi + 'dBm : ' + device.name);
          if(available.indexOf(device.id) === -1) {
            available.push(device.id);
          }
        });
        if(available.indexOf(self.deviceId) === -1) {
          q.reject(self.deviceId + ' is not available');
        } else {
          ble.connect(self.deviceId, function(event) {
            q.relsolve('Connected to ' + self.deviceId);
          }, function(error) {
            q.reject('Error: ' + error + ' (' + self.deviceId + ')');
          });
        }
      }, function() {
        q.reject('Bluetooth disabled. Cannot connect to device');
      }
    );

    return q.promise;
  };

  Peripheral.prototype.onError = function (error) {
    console.log('Error: ' + error + ' (' + this.deviceId + ')');
  };

  Peripheral.prototype.onConnect = function (event) {
    console.log('Connected to ' + this.deviceId);
    this.readDeviceInfo();
    //this.readBatteryLevel();
    // keep calling the battery level so we know multiple connections work
    //setInterval(this.readBatteryLevel.bind(this), 10000);
  };

  Peripheral.prototype.readDeviceInfo = function() {
    var self = this;
    var q = $q.defer();

    //ble.read(this.deviceId, '180A', '2A29', this.onReadDeviceInfo.bind(this), this.onError);
    ble.read(self.deviceId, '180A', '2A29', function(data) { self.deviceInfo.manufacturer = data; }, self.onError);
    ble.read(self.deviceId, '180A', '2A24', function(data) { self.deviceInfo.model = data; }, self.onError);
    ble.read(self.deviceId, '180A', '2A25', function(data) { self.deviceInfo.serial = data; }, self.onError);
    ble.read(self.deviceId, '180A', '2A27', function(data) { self.deviceInfo.hardware = data; }, self.onError);
    ble.read(self.deviceId, '180A', '2A26', function(data) { self.deviceInfo.firmware = data; }, self.onError);
    ble.read(self.deviceId, '180A', '2A28', function(data) { self.deviceInfo.software = data; q.resolve(); }, function() { self.onError(); q.reject(); });

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
