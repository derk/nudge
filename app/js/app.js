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