import React from 'react';
import { Link, hashHistory } from 'react-router';
import Clarifai from 'clarifai';
//import { getPhotoUrl } from './FirebaseAuth';
import { ref, firebaseAuth } from './FirebaseConstants';

class ScanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //prefer to do local url, else default to
    //web url
    if (props.location.state.state["localUrl"]) {
      this.state = {
        url: props.location.state.state["localUrl"]
      };
    } else {
      this.state = {
        url: props.location.state.state["url"]
      };
    }
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.GetFood();
  }

  /*
  GetFood() {
    var thisComponent = this;
    var photoKey = this.props.params.photoKey;
    console.log("PHOTO KEY:");
    console.log(photoKey);
    var user = firebaseAuth().currentUser;

    ref.child('/users/' + user.uid + '/photos/' + photoKey).once('value').then(function(snapshot) {
      var photoUrl = snapshot.val().url;
      var app = new Clarifai.App(
        's19v7HEjbnUYo9gGEQQihgdk0dgK14p2Trqfbpn3',
        'xlQkPSP5z2AKxyfUTzq3LmZMlxVn57LRsrE53zyi'
      );
      console.log("PHOTO URL:");
      console.log(photoUrl);
      app.models.predict("bd367be194cf45149e75f01d59f77ba7", photoUrl).then(
        function(response) {
          console.log(response);
          var concepts = response["outputs"][0]["data"]["concepts"];
          thisComponent.setState({
            url: photoUrl,
            concepts: concepts
          })
        },
        function(err) {
          console.error(err);
        }
      );
    });
  }
  */

  GetFood() {
    var thisComponent = this;
    /*
    var prevState = this.props.location.state.state;
    var photoUrl = prevState["url"];
    */
    var photoUrl = this.state.url;
    var app = new Clarifai.App(
      's19v7HEjbnUYo9gGEQQihgdk0dgK14p2Trqfbpn3',
      'xlQkPSP5z2AKxyfUTzq3LmZMlxVn57LRsrE53zyi'
    );
    console.log("PHOTO URL:");
    console.log(photoUrl);
    app.models.predict("bd367be194cf45149e75f01d59f77ba7", photoUrl).then(
      function(response) {
        console.log(response);
        var concepts = response["outputs"][0]["data"]["concepts"];
        thisComponent.setState({
          url: photoUrl,
          concepts: concepts
        })
      },
      function(err) {
        console.error(err);
      }
    );
  }

  render() {  
    var photoUrl = this.state.url;
    var concepts = this.state.concepts;
    return (
      <div className="row">
        <h2 className="text-center">Image Analysis</h2>
        <div className="col-lg-6 col-md-7 col-sm-6 col-xs-12">
          <img className="img-responsive" src={photoUrl} alt="food" />
        </div>
        <div className="col-lg-6 col-md-5 col-sm-6 col-xs-12">
          <p>We detected the following items</p>
          <small>(Click all that apply)</small>
          {this.state.concepts &&
            <ConceptPanel concepts={concepts} url={photoUrl} />
          }
        </div>
      </div>
    );
  }
}

class ConceptPanel extends React.Component {
  constructor(props) {
    super(props);
    var foodItems = {};
    props.concepts.map(function(concept) {
      foodItems[concept["name"]] = "redcard";
    });
    this.state = {fooditems: foodItems, url: props.url};
    this.handleChange = this.handleChange.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    //var thisComponent = this;
    var theClassName = event.currentTarget.className;
    console.log(theClassName);
    var conceptName = event.currentTarget.id;
    console.log(conceptName);
    var changes = this.state //object to hold changes
    var value = "redcard";
    if (theClassName === "card redcard") {
      value = "greencard";
    }
    changes["fooditems"][conceptName] = value;
    this.setState(changes); //update state
    console.log(this.state);
    //console.log(thisComponent.state);
  }

  handleClick(event) {
    event.preventDefault(); //don't submit
    var state = this.state;
    console.log(state);
    //var test = {food0: "banana", food1: "brocolli"};
    hashHistory.push({
      pathname: '/save',
      state: { state }
    });
  }

  render() {
    var concepts = this.props.concepts;
    console.log(concepts);
    var numConcepts = 10;
    var i = 0;
    var conceptCards = concepts.map((concept) => { //arrow function!
      if (i < numConcepts) {
        i++;
        return <ConceptCard concept={concept["name"]} key={concept["name"]} color={this.state.fooditems[concept["name"]]} changeCallback={this.handleChange} />;
      }
      return null;
    });
    console.log(this.state);
    return (
      <div>
        <div className="row">
          {conceptCards}
        </div>
        <button className="btn btn-success btn-lg" type="button" onClick={(e) => this.handleClick(e)}>Continue</button>
      </div>
    );
  }
}

class ConceptCard extends React.Component {
  /*
  constructor(props) {
    super(props);

    this.state = {color: 'redcard'};
    //this.handleClick = this.handleClick.bind(this);
  }

  /*
  handleClick(event) {
    var state = this.state;
    console.log(state);

    if (this.state.color === 'card redcard'){
      this.setState({color: 'card greencard'});
    } else {
      this.setState({color: 'card redcard'});
    }
  }
  */

  render() {
    var conceptName = this.props.concept;
    return (
      <div className="col-lg-4 col-sm-6 col-xs-6">
        <div id={conceptName} className={"card " + this.props.color} onClick={this.props.changeCallback}>
          <div className="content">
            <p className="text-center">{conceptName}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ScanPage;