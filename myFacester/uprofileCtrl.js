angular.module('app')
  .controller('UProfileCtrl', function ($scope, $timeout, $routeParams) {
    console.log("route", $routeParams.users);

    const profile = this;

    profile.data = null;

    profile.currentAuth = firebase.auth().currentUser;

    firebase.database().ref('/posts').orderByChild('users').equalTo($routeParams.users)
      .on('value', arg => {
        profile.data = arg.val();
        console.log('profile', profile.data)
        $timeout();
      })
  })