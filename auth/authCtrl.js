angular.module('app')
  .controller('AuthCtrl', function (AuthFactory, $location) {
    const auth = this;

    auth.loginUser = (email, password) => {
      AuthFactory.login(email, password);
    }

    auth.registerUser = (email, password, username) => {
      AuthFactory.register(email, password, username);
    }

    auth.logoutUser = () => {
      console.log("logged out, controller version");
      AuthFactory.logout();
      $location.path('/');
    }
  })