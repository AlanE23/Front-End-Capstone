const app = angular.module('app', ['angular.filter', 'ngRoute'])

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

    let editing = false;

    let key;

    main.data = null;

    main.heading = "myFacester";

    firebase.database().ref('/posts').on('value', (arg) => {
      main.data = arg.val();
      $timeout();
    })

    main.submit = function () {
      if (editing) {
        editing = false;
        main.update()
      } else {
        main.create()
      }
    }

    main.create = function () {
      firebase.database().ref(`/posts/`)
        .push({"users": main.users, "message": main.message, "images": main.images, "timestamp": main.timestamp})
        .then(() => {
          main.users = '';
          main.message = '';
          main.images = '';
          main.timestamp = '';
          $timeout();
      });
    }

    main.update = function () {
      firebase.database().ref(`/posts/${key}`)
        .update({"users": main.users, "message": main.message, "images": main.images, "timestamp": main.timestamp})
        .then(() => {
          main.users = '';
          main.message = '';
          main.images = '';
          main.timestamp = '';
          $timeout();
      })
    }

    main.delete = function (arg) {
      return firebase.database().ref(`posts/${arg}`)
        .set(null);
    }

    main.edit = function (id, posts) {
      main.users = posts.users;
      main.message = posts.message;
      main.images = posts.images;
      main.timestamp = posts.timestamp;
      key = id;
      editing = true;
    }

  });

  // .controller('authCtrl', function(){

  // })


// Auth Controller
//   app.controller('AuthCtrl', function (authFact) {
//     const auth = this;
//   auth.login = function() {
//     console.log("fire login func from AuthCtrl", auth.email, auth.password);
//     authFact.login(auth.email, auth.password)
//   }
//   auth.register = function() {
//     authFact.register(auth.email, auth.password)
//   }
// })

// Auth Factory
// "use strict";
// app.factory("authFact", function ($http, $location, $timeout) {
//   let currentuser = null
//     firebase.auth().onAuthStateChanged(function(user) {
//       console.log("fire on state of change");
//       if(user) {
//         currentuser = user
//         $location.path("/profile");
//       } else {
//         currentuser = null
//         $location.path('/');
//       }

//     });

//     return {
//       register(email, password){
//         firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//           // Handle Errors here.
//           console.log("regerror", error.message);
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // ...
//         });
//       },
//       login(email, password){
//         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//           // Handle Errors here.
//           console.log("loginerror", error.message);
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // ...
//         });
//       },
//       getUser() {
//         return currentuser
//       }
//     }
//   });
