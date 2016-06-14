const app = angular.module('app', ['angular.filter'])

  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyDRs3Yo29-47uD9aIMYsUxltGbjI82Rn08",
      authDomain: "ae-fe-capstone.firebaseapp.com",
      databaseURL: "https://ae-fe-capstone.firebaseio.com",
      storageBucket: "ae-fe-capstone.appspot.com",
    });
  })

  .controller('MainCtrl', function ($scope, $timeout) {
    const main = this;

    main.heading = "Working Title";
  });