angular.module('app')
  .controller('UProfileCtrl', function ($scope, $timeout, $routeParams) {
    console.log("route", $routeParams.users);

    const profile = this;

    profile.data = null;

    firebase.database().ref('/posts').orderByChild('users').equalTo($routeParams.users)
      .on('value', arg => {
        profile.data = arg.val();
        $timeout();
      })

    profile.heading = "Testing";
  })