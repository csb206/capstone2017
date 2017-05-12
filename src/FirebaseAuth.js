import { ref, firebaseAuth } from './FirebaseConstants';
import { hashHistory } from 'react-router';
import md5 from 'js-md5';

// export function auth (email, password) {
//   return firebaseAuth().createUserWithEmailAndPassword(email, password)
//     .then(saveUser)
//     .catch((error) => console.log('Oops', error))
// }

export function signOut() {
  return firebaseAuth().signOut()
    .then(() => {
      hashHistory.push("home");
    })
}

export function signIn(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
    .then(() => {
      //should I go to home?
      hashHistory.push("home");
    })
}

//A callback function for registering new users
export function signUp(email, password, handle) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      //creation successful, redirect to channel page
      //should I go to home?
      hashHistory.push("home");

      //get md5 of email for gravatar image
      var md5Email = md5(email);

      //update user profile to add display name
      //and avatar url
      firebaseUser.updateProfile({
        displayName: handle,
        photoURL: 'https://www.gravatar.com/avatar/' + md5Email
      }); //return promise for chaining

      //create new entry in the public viewable db
      return ref.child('users/'+firebaseUser.uid)
        .set({
          handle: handle,
          avatar: 'https://www.gravatar.com/avatar/' + md5Email
        })
        .then(() => firebaseUser)
    })
    .catch((error) => console.log('Oops', error))
}

/*
//post a new chirp to the database
export function postMessage(message, channel, userId, timestamp) {
  console.log(message);
  var messageRef = ref.child('messages');
  //var messageRef = ref.child('' + channel + '/');
  var newMessage = {
    text: message,
    userId: userId, //to look up chirper info
    time: timestamp //MAGIC
  };
  messageRef.push(newMessage); //upload
}
*/