angular.module('app')
  .factory('AuthFactory', ($location, $timeout) => {
    let userId;
    let token;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userId = user.uid;
      user.getToken()
        .then(t => token = t)
        .then($location.path.bind($location, '/mainPage'))
        .then($timeout)
    }
  })

    return {
      login (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
      },

      register (email, password, username) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then( user => {
        //   firebase.database().ref("/users/").push({handle: username, uid: user.uid})
        // })
      },

      logout () {
        console.log("LOOOOOGGGGGGEEEEEDDDD OUT!!!!");
        return  firebase.auth().signOut().then(function (response) {
          console.log("Log out response", response);
        }, function(error) {
          console.log("Houston, we have a problem", error);
        })
      },

      getUserData () {
        return {user: userId, authToken: token};
      }
    }
  })