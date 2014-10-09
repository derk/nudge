/**
 * @ngdoc service
 * @name Friends
 * @module nudge
 * @description
 * Friends Service
 */
NudgeModule
.factory('Friends', [
  '$window',
function($window) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var defaultFriends = [
    {'id': 0,  'firstName': 'Jane',     'lastName': 'Doe',      'title': 'Chief Executive',             'img': 'Julie_Taylor.jpg',   'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 1,  'firstName': 'Charles',  'lastName': 'Lewinton', 'title': 'Head of Engineering',         'img': 'James_King.jpg',     'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 2,  'firstName': 'Gareth',   'lastName': 'Carter',   'title': 'Principal Software Engineer', 'img': 'Eugene_Lee.jpg',     'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 3,  'firstName': 'Rob',      'lastName': 'Jennings', 'title': 'Principal Software Engineer', 'img': 'John_Williams.jpg',  'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 4,  'firstName': 'Ray',      'lastName': 'Moore',    'title': 'VP of Sales',                 'img': 'Ray_Moore.jpg',      'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 5,  'firstName': 'Paul',     'lastName': 'Jones',    'title': 'QA Manager',                  'img': 'Paul_Jones.jpg',     'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 6,  'firstName': 'Paula',    'lastName': 'Gates',    'title': 'Software Architect',          'img': 'Paula_Gates.jpg',    'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 7,  'firstName': 'Lisa',     'lastName': 'Wong',     'title': 'Marketing Manager',           'img': 'Lisa_Wong.jpg',      'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 8,  'firstName': 'Gary',     'lastName': 'Donovan',  'title': 'Marketing Manager',           'img': 'Gary_Donovan.jpg',   'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 9,  'firstName': 'Kathleen', 'lastName': 'Byrne',    'title': 'Sales Representative',        'img': 'Kathleen_Byrne.jpg', 'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 10, 'firstName': 'Amy',      'lastName': 'Jones',    'title': 'Sales Representative',        'img': 'Amy_Jones.jpg',      'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'},
    {'id': 11, 'firstName': 'Steven',   'lastName': 'Wells',    'title': 'Software Architect',          'img': 'Steven_Wells.jpg',   'enabled': false, 'colourVal': 0x000000, 'colourName': 'white'}
  ];

  var friends = [];

  return {
    all: function() {
      friends = JSON.parse($window.localStorage.getItem('friends'));
      if(friends === null) {
        friends = defaultFriends;
        $window.localStorage.setItem('friends', JSON.stringify(friends));
      }
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    },
    save: function(friends) {
      $window.localStorage.setItem('friends', JSON.stringify(friends));
    },
    remove: function() {
      $window.localStorage.removeItem('friends');
    },
    clear: function() {
      $window.localStorage.clear();
    }
  };
}]);
