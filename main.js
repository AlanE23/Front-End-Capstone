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

    main.data = null;

    main.heading = "Working Title";

    firebase.database().ref('/posts').on('value', (arg) => {
      main.data = arg.val();
      $timeout();
    })

    main.create = function () {
      firebase.database().ref(`/posts/`)
        .push({"users": main.users, "message": main.message, "images": main.images, "timestamp": main.timestamp})
        // .then(() => main.users = '');
        // .then(() => main.message = '');
        // .then(() => main.images = '');
        // .then(() => main.timestamp = '');
    }

    main.delete = function (arg) {
      console.log('DELETE PRESSED');
      return firebase.database().ref(`posts/${arg}`)
        .set(null);
    }

  });


// <div ng-repeat="posts in main.data">
//   <ul>
//     <li>{{posts.users}}</li>
//     <li>{{posts.message}}</li>
//     <li>{{posts.timestamp}}</li>
//     <li><img src="{{posts.images}}"></li>
//     <li><button type="click" ng-click="main.delete(votes.$key)">Delete</button></li>
//   </ul>
// </div>

  // board.createNewPin = function () {
  //   UserProfileFact.createPin(board.newPin);
  //   $timeout (() => {
  //     location.reload()
  //   }, 1000);
  // }
  // <form>
  //   <input type="text"  placeholder="Title of Pin" ng-model="board.newPin.title"/>
  //   <input type="text" placeholder="Url of Image" ng-model="board.newPin.url"/>
  //   <input type="submit" class="btn btn-info" value="Save" ng-click="board.createNewPin()"
  //   onclick="this.disabled=true;this.form.submit();"/>
  //   <input type="submit" class="btn btn-danger" value="Cancel" data-dismiss="modal"/>
  // </form>