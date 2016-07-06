// "use strict"

// angular.module('app')
//   .factory('MainFactory', ($timeout) => {

//     return
//       var send = function(file, path = file.name) {
//         return $timeout().then(() => (
//           new Promise ((resolve, reject) => {
//             const uploadTask = firebase.storage().ref()
//               .child(path).put(file)

//             uploadTask.on('state_changed',
//               null,
//               reject,
//               () => resolve(uploadTask.snapshot)
//             )
//           })
//         ))
//       }


//   })