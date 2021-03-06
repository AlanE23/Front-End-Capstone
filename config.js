app.config(($routeProvider) =>
  ($routeProvider
    .when('/', {
      controller: 'AuthCtrl',
      controllerAs: 'auth',
      templateUrl: 'auth/login.html'
    })
    .when('/mainPage', { // main page
      controller:'MainCtrl',
      controllerAs: 'main',
      templateUrl: 'myFacester/mainPage.html',
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/login')
          }
        }
      }
    })
    .when ('/userProfile/:users', { // '/:id/userProfile'
      controller: 'UProfileCtrl',
      controllerAs: 'profile',
      templateUrl: 'myFacester/userProfile.html',
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/login')
          }
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    })
))