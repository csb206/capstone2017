import { ref, firebaseAuth } from './FirebaseConstants';
import { hashHistory } from 'react-router';
import md5 from 'js-md5';
import dailyValues from './dailyvalues.json';

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

//A callback function for registering new users
export function uploadPhoto(url, foodItems) {
  /*
  return firebaseAuth().currentUser.updateProfile(email, password)
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
          avatar: 'https://www.gravatar.com/avatar/' + md5Email,
          photos: {}
        })
        .then(() => firebaseUser)
    })
    .catch((error) => console.log('Oops', error))
    */
    var user = firebaseAuth().currentUser;

    /*
    user.updateProfile({
      photos: "test"
    }).then(function() {
      // Update successful.
      console.log("WORKS");
    }, function(error) {
      console.log("error");
      // An error happened.
    });
    */

    var newPhotoRef = ref.child('users/'+user.uid+'/photos').push();
    console.log(foodItems);
    newPhotoRef.set({
          time: Math.round((new Date()).getTime() / 1000),
          url: url,
          fooditems: foodItems
        })
        .then(() => user)
    //hashHistory.push("save/" + newPhotoRef.key);
}

//A callback function for getting most recently uploaded photo
export function getPhotoUrl(photoKey) {
  /*
  return firebaseAuth().currentUser.updateProfile(email, password)
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
          avatar: 'https://www.gravatar.com/avatar/' + md5Email,
          photos: {}
        })
        .then(() => firebaseUser)
    })
    .catch((error) => console.log('Oops', error))
    */
    var user = firebaseAuth().currentUser;

    /*
    user.updateProfile({
      photos: "test"
    }).then(function() {
      // Update successful.
      console.log("WORKS");
    }, function(error) {
      console.log("error");
      // An error happened.
    });
    */
    ref.child('/users/' + user.uid + '/photos/' + photoKey).once('value').then(function(snapshot) {
      return snapshot.val().url;
    });
}

//A callback function for getting most recently uploaded photo
export function getPhotoFoodItems(photoKey) {
    var user = firebaseAuth().currentUser;
    ref.child('/users/' + user.uid + '/photos/' + photoKey).once('value').then(function(snapshot) {
      return snapshot.val().fooditems;
    });
}

//A callback function for getting most recently uploaded photo
export function getTopNNutrients(json, n) {
  //console.log(json);
  var fields = json.hits[0].fields;
  // console.log(fields);
  // console.log(dailyValues);
  var nutDvValues = {};
  var fieldNames = ["nf_calcium_dv", "nf_calories", "nf_cholesterol", "nf_dietary_fiber", "nf_iron_dv", "nf_protein", "nf_sodium", "nf_total_carbohydrate", "nf_total_fat", "nf_vitamin_a_dv", "nf_vitamin_c_dv"];
  //console.log(dailyValues[fieldNames[1].slice(3)]);
  //console.log(fieldNames[0].slice(3));
  fieldNames.map(function(fieldName) {
    if (fieldName.includes("_dv")) {
      nutDvValues["dv_" + fieldName] = fields[fieldName];
    } else {
      nutDvValues["dv_" + fieldName] = (fields[fieldName] / dailyValues[fieldNames[1].slice(3)]) * 100.0;
    }
  });
  //console.log(nutDvValues);
  var sortedDvValue = [];
  for (var nute in nutDvValues) {
    sortedDvValue.push([nute, nutDvValues[nute]]);
  }
  sortedDvValue.sort(function(a, b) {
    return b[1] - a[1];
  });
  //console.log(sortedDvValue);
  var topNutrients = [];
  for (var i = 0; i < n; i++) {
    topNutrients.push(sortedDvValue[i][0])
  }
  console.log(topNutrients);
  return topNutrients;
}

//A callback function for getting most recently uploaded photo
export function getRecentPhotoUrls() {
  /*
  return firebaseAuth().currentUser.updateProfile(email, password)
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
          avatar: 'https://www.gravatar.com/avatar/' + md5Email,
          photos: {}
        })
        .then(() => firebaseUser)
    })
    .catch((error) => console.log('Oops', error))
    */
    var user = firebaseAuth().currentUser;
    var topUserPostsRef = ref.child('users/' + user.uid).orderByChild('time');
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