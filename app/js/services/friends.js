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
    {"id": 0, "firstName": "James", "lastName": "King", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "img": "James_King.jpg", "twitterId": "@fakejking", "enabled": true, "colour": 0x000000},
    {"id": 1, "firstName": "Julie", "lastName": "Taylor", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "img": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", "enabled": true, "colour": 0x000000},
    {"id": 2, "firstName": "Eugene", "lastName": "Lee", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "img": "Eugene_Lee.jpg", "twitterId": "@fakeelee", "enabled": true, "colour": 0x000000},
    {"id": 3, "firstName": "John", "lastName": "Williams", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "img": "John_Williams.jpg", "twitterId": "@fakejwilliams", "enabled": true, "colour": 0x000000},
    {"id": 4, "firstName": "Ray", "lastName": "Moore", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "img": "Ray_Moore.jpg", "twitterId": "@fakermoore", "enabled": true, "colour": 0x000000},
    {"id": 5, "firstName": "Paul", "lastName": "Jones", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "img": "Paul_Jones.jpg", "twitterId": "@fakepjones", "enabled": true, "colour": 0x000000},
    {"id": 6, "firstName": "Paula", "lastName": "Gates", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "img": "Paula_Gates.jpg", "twitterId": "@fakepgates", "enabled": true, "colour": 0x000000},
    {"id": 7, "firstName": "Lisa", "lastName": "Wong", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "img": "Lisa_Wong.jpg", "twitterId": "@fakelwong", "enabled": true, "colour": 0x000000},
    {"id": 8, "firstName": "Gary", "lastName": "Donovan", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "img": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", "enabled": true, "colour": 0x000000},
    {"id": 9, "firstName": "Kathleen", "lastName": "Byrne", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "img": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", "enabled": true, "colour": 0x000000},
    {"id": 10, "firstName": "Amy", "lastName": "Jones", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "img": "Amy_Jones.jpg", "twitterId": "@fakeajones", "enabled": true, "colour": 0x000000},
    {"id": 11, "firstName": "Steven", "lastName": "Wells", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "img": "Steven_Wells.jpg", "twitterId": "@fakeswells", "enabled": true, "colour": 0x000000}
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