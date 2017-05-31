import React from 'react';
import { firebaseAuth, ref } from './FirebaseConstants';
import { Link, hashHistory } from 'react-router';
import { getTopNNutrients } from './FirebaseAuth';
import { FoodRow } from './SaveFood.js';
import { nutixAppId, nutixAppKey } from './FirebaseConstants';


class NutritionHistoryPage extends React.Component {
  constructor(props){
    super(props);
    //console.log(props);
    if (this.props.location.state) {
      this.state = {
        url: props.location.state.changes["url"],
        time: props.location.state.changes["time"]
      };
    } else {
      this.state = {
        url: "",
        time: 0
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var url = event.currentTarget.src;
    var time = 0;
    time = event.currentTarget.name;
    //console.log(time);
    var changes = {url: url, time: time};
    this.setState(changes); //update state
  }

  render() {
    var numImgs = 0;
    var url = this.state.url;
    var time = this.state.time;
    return (
      <div>
          <h2 className="text-center">Nutritional History</h2>
          {url.length > 0 &&
            <CurrentPhoto url={url} time={time} />
          }
          <RecentPhotoHistory numimgs={numImgs} slim={false} changeCallback={this.handleChange} />
      </div>
    );
  }
}

class CurrentPhoto extends React.Component {
  constructor(props){
    super(props);
    //console.log(props);
    this.state = {
      url: props.url,
      time: props.time,
      fooditems: {}
    };
  }

  componentDidMount() {
    var thisComponent = this;
    var url = this.props.url; //shortcut
    var user = firebaseAuth().currentUser;
    //.equalTo(this.state.time)
    if (user && url.length > 0) {
      //console.log("TEST");
      //console.log(this.state.time);
      ref.child('/users/' + user.uid + "/photos").orderByChild("url").equalTo(url).once('value').then(function(snapshot) {
        var photos = snapshot.val();
        for (var key in photos) {
          var foodItems = photos[key]["fooditems"];
          var changes = {
            fooditems: {},
            url: url
          };
          foodItems.map(function(foodItem) {
          //for (var i = 0; i < foodItems.length; i++) {
            //var foodItem = foodItems[i];
            fetch('https://api.nutritionix.com/v1_1/search/' + foodItem + '?results=0:1&cal_min=0&cal_max=800&fields=item_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium&appId=' + nutixAppId + '&appKey=' + nutixAppKey) 
              .then(function(response) {
                return response.json();
              }).then(function(json) {
                //console.log('parsed json', json);
                var topNutrients = getTopNNutrients(json, 5);
                //var topNutrients = ["vitamin a", "vitamin c", "iron", "fiber", "calcium"];
                // console.log("FOODITEM:");
                // console.log(foodItem);
                changes["fooditems"][foodItem] = topNutrients;
                thisComponent.setState(changes);
                // console.log("CHANGES STATE:");
                // console.log(thisComponent.state);
              }).catch(function(ex) {
                console.log('parsing failed', ex)
              });


            // var changes = thisComponent.state;
            // changes["fooditems"][foodItems[i]] = {test: "test"};
            // thisComponent.setState(changes);
          //}
          });
        }
      });
    }
  }

  /*
  componentWillReceiveProps() {
    var thisComponent = this;
    var url = this.props.url; //shortcut
    console.log(url);
    var user = firebaseAuth().currentUser;
    //.equalTo(this.state.time)
    if (user && url.length > 0) {
      //console.log("TEST");
      //console.log(this.state.time);
      ref.child('/users/' + user.uid + "/photos").orderByChild("url").equalTo(url).once('value').then(function(snapshot) {
        var photos = snapshot.val();
        for (var key in photos) {
          var foodItems = photos[key]["fooditems"];
          for (var i = 0; i < foodItems.length; i++) {
            var foodItem = foodItems[i];
            fetch('https://api.nutritionix.com/v1_1/search/' + foodItem + '?results=0:1&cal_min=0&cal_max=800&fields=item_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium&appId=4f560b3d&appKey=24dcbf7f28f68705cac990d70292d901') 
              .then(function(response) {
                return response.json();
              }).then(function(json) {
                //console.log('parsed json', json);
                var changes = {
                  fooditems: {},
                  url: ""
                };
                var topNutrients = getTopNNutrients(json, 5);
                //var topNutrients = ["vitamin a", "vitamin c", "iron", "fiber", "calcium"];
                changes["fooditems"][foodItem] = topNutrients;
                changes["url"] = url;
                thisComponent.setState(changes);
                // console.log("CHANGES STATE:");
                // console.log(thisComponent.state);
              }).catch(function(ex) {
                console.log('parsing failed', ex)
              });


            // var changes = thisComponent.state;
            // changes["fooditems"][foodItems[i]] = {test: "test"};
            // thisComponent.setState(changes);
          }
        }
      });
    }
  }
  */

  componentWillUpdate(nextProps, nextState) {
    var thisComponent = this;
    var url = nextProps.url; //shortcut
    if (url !== this.state.url) {
      var user = firebaseAuth().currentUser;
      //.equalTo(this.state.time)
      if (user && url.length > 0) {
        //console.log("TEST");
        //console.log(this.state.time);
        ref.child('/users/' + user.uid + "/photos").orderByChild("url").equalTo(url).once('value').then(function(snapshot) {
          var photos = snapshot.val();
          for (var key in photos) {
            var foodItems = photos[key]["fooditems"];
            var changes = {
              fooditems: {},
              url: url
            };
            foodItems.map(function(foodItem) {
            //for (var i = 0; i < foodItems.length; i++) {
              //var foodItem = foodItems[i];
              fetch('https://api.nutritionix.com/v1_1/search/' + foodItem + '?results=0:1&cal_min=0&cal_max=800&fields=item_name,nf_calories,nf_total_fat,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium&appId=' + nutixAppId + '&appKey=' + nutixAppKey) 
                .then(function(response) {
                  return response.json();
                }).then(function(json) {
                  //console.log('parsed json', json);
                  var topNutrients = getTopNNutrients(json, 5);
                  //var topNutrients = ["vitamin a", "vitamin c", "iron", "fiber", "calcium"];
                  // console.log("FOODITEM:");
                  // console.log(foodItem);
                  changes["fooditems"][foodItem] = topNutrients;
                  thisComponent.setState(changes);
                  // console.log("CHANGES STATE:");
                  // console.log(thisComponent.state);
                }).catch(function(ex) {
                  console.log('parsing failed', ex)
                });


              // var changes = thisComponent.state;
              // changes["fooditems"][foodItems[i]] = {test: "test"};
              // thisComponent.setState(changes);
            //}
            });
          }
        });
      }
    }
  }

  render() {
    var url = this.props.url; //shortcut
    /*
    console.log("STATE:");
    console.log(this.state);
    var time = this.props.time;
    var isAddNew = this.props.addnew;
    */
    var prevState = this.state;
    var foodItems = this.state.fooditems;
    var keys = [];
    for (var k in foodItems) {
      keys.push(k);
    }
    var foodRows = keys.map(function(key) {
      var foodItem = key;
      return (
        <FoodRow key={foodItem} item={foodItem} topnutrients={foodItems[foodItem]} />
      );
    })

    //console.log(this.props.changeCallback);
    return (
      <div className="row">
        <div className="col-lg-4 col-sm-6 col-xs-6">
          <img className="img-thumbnail" src={this.state.url} alt="Current Photo" />
        </div>
        <div className="col-lg-8 col-sm-6 col-xs-6">
          <div className="card">
            <div className="content">
              {foodRows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class RecentPhotoHistory extends React.Component {
  constructor(props){
    super(props)
    //initialize state
    this.state = {
      photoUrls: [],
      photoTimes: []
    };
  }

  componentDidMount() {
    var numImgs = this.props.numimgs;
    var thisComponent = this;
    this.unregister = firebaseAuth().onAuthStateChanged(user => {
      if(user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({userId:user.uid, handle: user.displayName, email: user.email});
      }
      else{
        console.log('Auth state changed: logged out');
        this.setState({userId: null, handle: null, email: null});
      }
      var user = firebaseAuth().currentUser;
      if (user) {
        var photoUrls = [];
        var photoTimes = [];
        if (numImgs > 0) {
          ref.child('/users/' + user.uid + "/photos").orderByChild("time").limitToLast(numImgs).once('value').then(function(snapshot) {
            var photos = snapshot.val();
            for (var key in photos) {
              photoUrls.push(photos[key]['url']);
              photoTimes.push(photos[key]['time']);
            }
            photoUrls = photoUrls.reverse();
            photoTimes = photoTimes.reverse();
            thisComponent.setState({photoUrls: photoUrls, photoTimes: photoTimes});
          });
        } else {
          ref.child('/users/' + user.uid + "/photos").orderByChild("time").once('value').then(function(snapshot) {
            var photos = snapshot.val();
            for (var key in photos) {
              photoUrls.push(photos[key]['url']);
              photoTimes.push(photos[key]['time']);
            }
            photoUrls = photoUrls.reverse();
            photoTimes = photoTimes.reverse();
            thisComponent.setState({photoUrls: photoUrls, photoTimes: photoTimes});
          });
        }
      }
    })
  }

  render() {
    var isSlim = this.props.slim;
    //console.log(isSlim);
    var numImgs = this.props.numimgs;
    var imageCards;
    var i = 0;
    if (numImgs) {
      imageCards = this.state.photoUrls.map((photo) => { //arrow function!
        if (i < numImgs) {
          i++;
          return <ImageCard url={photo} key={photo + "i" + i} time={this.state.photoTimes[i]} />;
        }
        return null;
      });
      imageCards.push(<ImageCard url="http://icongal.com/gallery/image/268146/add_button_new_edit_car_plus_green_equal.png" key={"addnew" + (i + i)} addnew={true} time={0} />)
    } else {
      imageCards = this.state.photoUrls.map((photo) => { //arrow function!
        i++;
        return <ImageCard url={photo} key={photo + "i" + i} changeCallback={this.props.changeCallback} time={this.state.photoTimes[i]} />;
      });
    }

    return (
      <div>
          <div className="row">
            {!isSlim &&
              <div className="cards-container">
                {imageCards}
              </div>
            }
            {isSlim &&
              <div className="cards-container-slim">
                {imageCards}
              </div>
            }
          </div>
      </div>
    );
  }
}

class ImageCard extends React.Component {
  handleClick(event){
    var url = event.currentTarget.src;
    var time = event.currentTarget.name;
    var changes = {url: url, time: time};
    //console.log(changes);
    hashHistory.push({
      pathname: '/history',
      state: { changes }
    });
  }

  handleAddNewClick(event){
    hashHistory.push({
      pathname: '/getimage',
    });
  }

  render() {
    var url = this.props.url; //shortcut
    var time = this.props.time;
    var isAddNew = this.props.addnew;
    //console.log(this.props.changeCallback);
    return (
      <div className="card">
        <div className="content">
          {isAddNew && 
            <img className="img-thumbnail" name={time} src={url} alt="Add New" onClick={(e) => this.handleAddNewClick(e)} />
          }
          {!isAddNew && this.props.changeCallback &&
            <img className="img-thumbnail" name={time} src={url} alt="Food Image" onClick={this.props.changeCallback} />
          }
          {!isAddNew && !this.props.changeCallback &&
            <img className="img-thumbnail" name={time} src={url} alt="Food Image" onClick={(e) => this.handleClick(e)} />
          }
        </div>
      </div>
    );
  }
}

export default NutritionHistoryPage;

export {NutritionHistoryPage, RecentPhotoHistory };