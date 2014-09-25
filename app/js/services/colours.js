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