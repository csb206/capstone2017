import { firebaseAuth } from './FirebaseConstants';
//Open weather api key
var apiKey = "0ca4990abd225486f4f40b31c3b8fdb7";
//Open weather API gateway
var baseApiUrl = "//api.openweathermap.org/data/2.5";

var controller = {
  //extract data given the query
  getUserData: function(userId) {  
    console.log("FUNCTION HIT");
    /*
    //the current weather is listed under /weather  
    var resource = '/weather';
    //construct proper uri
    var uri = baseApiUrl + resource + '?q=' + searchQuery + '&units=imperial&appid=' + apiKey;
    //ajax call
    return fetch(uri)
      .then(function(res) { return res.json(); })
    */
    var ref = firebaseAuth.ref("users");
    ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
      console.log(snapshot.key);
    });
    var testReturn = {
      handle: "testerFUCK"
    }
    return testReturn
  },

  //extract data given the query
  getHomepage: function(userId) {  
    /*
    //forecast weather is listed under /forecast/daily  
    var resource = '/forecast/daily';
    //construct proper uri
    var uri = baseApiUrl + resource + '?q=' + searchQuery + '&cnt=' + numDays + '&units=imperial&mode=json&appid=' + apiKey;
    //ajax call
    return fetch(uri)
      .then(function(res) { return res.json(); })
    */
    var dashboardData = {
      carb: 40,
      fat: 30,
      protein: 30
    }
    return dashboardData;
  }
};

export default controller; //export object