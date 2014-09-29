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
