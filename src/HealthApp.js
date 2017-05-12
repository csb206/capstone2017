import React from 'react';
import _ from 'lodash';
import { Link, hashHistory } from 'react-router';
import { Chart } from 'react-google-charts';
import { firebaseAuth } from './FirebaseConstants';
import { signOut } from './FirebaseAuth';

import SAMPLE_DOGS from './dog-data'; //load the dog data to use

//import the controller
import HealthController from './HealthController';

class HealthApp extends React.Component {
  constructor(props){
    super(props);

    //set initial empty state
    //(Pets is being loaded locally for testing)
    this.state = {pets: SAMPLE_DOGS, userId: null, dashboard: {}}; //in state as if coming from Controller
  }

  componentDidMount() {
    this.unregister = firebaseAuth().onAuthStateChanged(user => {
      if(user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({userId:user.uid, handle: user.displayName});
      }
      else{
        console.log('Auth state changed: logged out');
        this.setState({userId: null, handle: null});
      }
    })
  }

  render() {    
    //extract the breeds (thanks lodash!)
    //var breeds = Object.keys(_.groupBy(this.state.pets, 'breed'));
    
    return (
      <div>
        <header className="well">
          <div className="container">
            <HeaderBar user={this.state.userId} handle={this.state.handle} />
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <NavLinks />
            </div>
            <div className="col-xs-9">
              {this.props.children}
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Scott Kinder and Cory Brown Capstone Project 2017</small>
        </footer>
      </div>
    );
  }
}

class HeaderBar extends React.Component {
  //set constructor
  constructor(props) {
    super(props);
  }

  /*
  //helper function that fetches the current weather data
  fetchUserData(searchTerm) {
    //saves original this, so can set state of original this
    var thisComponent = this;
    //Use controller to search current weather
    HealthController.getUserData(searchTerm)
      //wait for response
      .then(function(data) {
        //set the state
        thisComponent.setState({
          handle: data["handle"]
        })
      });
  }
  */

  render() {
    return (
      <div>
          <h1 id="title">Health Nuts</h1>
        {this.props.user &&
          <div className="pull-right">
            <span>
              Hi, {this.props.handle} &nbsp;
            </span>
            <button className="btn btn-default btn-small pull-right" onClick={signOut}>
              Log Out
            </button>
          </div>
        }
        {!this.props.user &&
          <div className="pull-right">
            <Link to="/login">
              <button className="btn btn-default btn-small btn-space">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-default btn-small btn-space">
                Sign Up
              </button>
            </Link>
          </div>
        } 
      </div>
    );
  }
}

class NavLinks extends React.Component {
  render() {
    return (
      <nav>
        <ul className="list-unstyled">
          <li><Link to="/home" activeClassName="activeLink">Home</Link></li>
          <li><Link to="/scan" activeClassName="activeLink">Upload Image</Link></li>
          <li><Link to="/resources" activeClassName="activeLink">Resources</Link></li>
        </ul>
      </nav>      
    );
  }
}

class HomePage extends React.Component {
  constructor(props){
    super(props)
    //initialize state
    this.state = {
      dashboard: {
        carb: 0,
        fat: 0,
        protein: 0
      }
    };
  }

  componentDidMount() {
    this.unregister = firebaseAuth().onAuthStateChanged(user => {
      if(user) {
        console.log('Auth state changed: logged in as', user.email);
        this.setState({userId:user.uid, handle: user.displayName, email: user.email});
      }
      else{
        console.log('Auth state changed: logged out');
        this.setState({userId: null, handle: null, email: null});
      }
    })
  }

  //helper function that fetches the homepage data
  fetchHomepage(searchTerm) {
    //saves original this, so can set state of original this
    var thisComponent = this;
    //Use controller to search current weather
    HealthController.getHomepage(searchTerm)
      //wait for response
      .then(function(data) {
        console.log(data);
        //set the state
        thisComponent.setState({
          dashboard: {
                        carb: data["carb"],
                        fat: data["fat"],
                        protein: data["protein"]
                      }
        })
      });
  }

  render() {

    var dashboardData = this.state.dashboard;
    /*
    if(this.props.params.breed){ //if have a param
      //filter the list based on that!
      dogList = dogList.filter(dog => dog.breed === this.props.params.breed);
    }

    var dogCards = dogList.map((dog) => { //arrow function!
      return <DogCard mutt={dog} key={dog.name} />;
    })

    <div>
                <img id="profilepicture" src="http://www.hexatar.com/gallery/thumb/20151029_m5631acd00bba4.png" />
              </div>

    */

    var imageUrls = ["https://images.blogthings.com/whatthanksgivingleftoversareyouquiz/plate-of-food.jpg",
      "http://images.all-free-download.com/images/graphiclarge/fries_and_steak_on_plate_193268.jpg",
      "http://www.clipartkid.com/images/493/plate-of-food-stock-photos-image-135843-l8bEIE-clipart.jpg",
      "http://www.clipartkid.com/images/527/scrounging-up-ideas-for-thanksgiving-dinner-check-out-these-soul-food-UaFQVC-clipart.jpg"
    ];

    var imageCards = imageUrls.map((url) => { //arrow function!
      return <ImageCard url={url} key={url} />;
    })

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <div className="container">
                <div className="row">
                  <div className="col-xs-6">
                    <img id="profilepicture" src="http://www.hexatar.com/gallery/thumb/20151029_m5631acd00bba4.png" />
                  </div>
                  <div className="col-xs-6">
                    <p>{this.state.handle}</p>
                    <p>{this.state.email}</p>
                    <p><a>Edit Profile</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <div id="chartdiv">
                <Chart
                  chartType="PieChart" 
                  data={[
                    ['Nutrient Type', 'Percentage'],
                    ['Carbs',    40],
                    ['Fats',     30],
                    ['Proteins', 30],
                  ]}
                  options={{}}
                  graph_id="ScatterChart"
                  width="100%"
                  height="150px"
                  legend_toggle   
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <Link to="/scan">
                <button className="btn btn-default btn-lg text-center" onClick={(e) => this.handleClickUploadImage(e)}>
                  Upload Image
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="cards-container">
              {imageCards}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class BreedLinks extends React.Component {
  render() {
    
    var links = this.props.breeds.map(function(breed){
      return <li key={breed}><Link to={'/list/'+breed} activeClassName="activeLink">{breed}</Link></li>;
    })

    return (
      <nav>
        <ul className="list-unstyled">
          {links}
          <li><Link to="list" activeClassName="activeLink" onlyActiveOnIndex={true}>All Breeds</Link></li>
        </ul>
      </nav>
    );
  }
}

class ImageCard extends React.Component {

  handleClick(){
    alert("View Image");
  }

  render() {
    var url = this.props.url; //shortcut
    return (
      <div className="card">
        <div className="content">
          <img src={url} alt="Food Image" />
        </div>
      </div>
    );
  }
}

export {HomePage, HealthApp}; //export both components

export default HealthApp;