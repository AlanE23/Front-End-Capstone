angular.module('app')
  .controller('MainCtrl', function ($scope, $timeout) {
      const main = this;

      let editing = false;

      main.data = null;

      firebase.database().ref('/posts').on('value', (arg) => {
        main.data = arg.val();
        $timeout();
      })

      main.heading = "pseudo-uplifting phrase about this app";

      main.currentAuth = firebase.auth().currentUser

      main.currentUserName = main.currentAuth.email.split('@')[0];

      // main.imgUrls = [];

      main.add = function () {
        main.message = '';
        main.images = '';
        main.timestamp = '';
      }

      main.submit = function () {
        if (editing) {
          editing = false;
          main.update()
        } else {
          main.create()
        }
      }

      main.create = function () {
        let updateTime = new Date();
        updateTime = updateTime.toLocaleTimeString();
        firebase.database().ref(`/posts/`)
          .push({"users": firebase.auth().currentUser.uid, "message": main.message, "images": main.images, "timestamp": updateTime,
            "handle": firebase.auth().currentUser.email.split('@')[0]
          })
          .then(() => {
            main.message = '';
            main.images = '';
            main.timestamp = '';
            $timeout();
          });
      }

      main.update = function () {
        firebase.database().ref(`/posts/${key}`)
          .update({"message": main.message, "images": main.images, "timestamp": main.timestamp})
          .then(() => {
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
        main.message = posts.message;
        main.images = posts.images;
        main.timestamp = posts.timestamp;
        key = id;
        editing = true;
      }
    });





// firebase.database()
//       .ref('/images/')
//       .orderByChild('uid')
//       .equalTo(currentUser)
//       .on("value", (snap) => {
//         console.log("key", snap.val() );
//         profile.data = snap.val();
//         $timeout();
//     })














