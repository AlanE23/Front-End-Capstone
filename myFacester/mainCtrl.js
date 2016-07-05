angular.module('app')
  .controller('MainCtrl', function ($scope, $timeout, uploadFactory) {
      const main = this;

      let editing = false;

      main.data = null;

      main.imgURLs = [];

      firebase.database().ref('/posts').on('value', (arg) => {
        main.data = arg.val();
        $timeout();
      })

      main.heading = "Upload your thoughts, then download everyone else's";

      main.currentAuth = firebase.auth().currentUser

      main.currentUserName = main.currentAuth.email.split('@')[0];

      main.add = function () {
        main.message = '';
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

        const input = document.querySelector('[type="file"]');
        const file = input.files[0];

        const randomInteger = Math.random() * 1e17;
        const getFileExtension = file.type.split('/').slice(-1)[0];
        const randomPath = `${randomInteger}.${getFileExtension}`;

        uploadFactory.send(file, randomPath)
          .then(res => {
            main.imgURLs.push(res.downloadURL)
            return res.downloadURL
          })
          .then((url) => {
            firebase.database().ref(`/posts/`)
            .push({"users": firebase.auth().currentUser.uid, "images": {url}, "message": main.message, "timestamp": updateTime,
              "handle": firebase.auth().currentUser.email.split('@')[0]
            })
            .then(() => {
              main.message = '';
              $timeout();
            });
          })
      }

      main.update = function () {
        firebase.database().ref(`/posts/${key}`)
          .update({"message": main.message, "timestamp": main.timestamp})
          .then(() => {
            main.message = '';
            $timeout();
          })
      }

      main.delete = function (arg) {
        console.log("DEEELLLLLLEEEEEEETTTTTTEEE", arg);
        return firebase.database().ref(`posts/${arg}`)
          .set(null);
      }

      main.edit = function (id, posts) {
        main.message = posts.message;
        key = id;
        editing = true;
      }
    })
  .factory('uploadFactory', ($timeout) => ({
    send (file, path = file.name) {
      return $timeout().then(() => (
        new Promise ((resolve, reject) => {
          const uploadTask = firebase.storage().ref()
            .child(path).put(file)

          uploadTask.on('state_changed',
            null,
            reject,
            () => resolve(uploadTask.snapshot)
          )
        })
      ))
    }
  }))





// firebase.database()
//       .ref('/images/')
//       .orderByChild('uid')
//       .equalTo(currentUser)
//       .on("value", (snap) => {
//         console.log("key", snap.val() );
//         profile.data = snap.val();
//         $timeout();
//     })














