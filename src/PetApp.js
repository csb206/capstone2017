import React from 'react';
import _ from 'lodash';
import SAMPLE_DOGS from './dog-data'; //load the dog data to use

class PetApp extends React.Component {
  constructor(props){
    super(props);

    //this ideally would be set up from a Controller
    this.state = {pets: SAMPLE_DOGS}; //in state as if coming from Controller
  }

  render() {    
    //extract the breeds (thanks lodash!)
    var breeds = Object.keys(_.groupBy(this.state.pets, 'breed'));

    return (
      <div>
        <header className="well">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <BreedLinks breeds={breeds} />
              <GeneralLinks />
            </div>
            <div className="col-xs-9">
              <DogList />
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class GeneralLinks extends React.Component {
  render() {
    return (
      <nav>
        <h2>Navigation</h2>
        <ul className="list-unstyled">
          <li><a>Adopt a Pet</a></li>
          <li><a>About Us</a></li>
          <li><a>Resources</a></li>
        </ul>
      </nav>      
    );
  }
}

class BreedLinks extends React.Component {
  render() {
    
    var links = this.props.breeds.map(function(breed){
      return <li key={breed}><a>{breed}</a></li>;
    })

    return (
      <nav>
        <h2>Breeds</h2>
        <ul className="list-unstyled">
          {links}
        </ul>
      </nav>
    );
  }
}

class DogList extends React.Component {
  constructor(props){
    super(props)
    this.state = {dogs:SAMPLE_DOGS}; //in state as if coming from Controller
  }

  render() {
    var dogList = this.state.dogs;
    var dogCards = dogList.map((dog) => { //arrow function!
      return <DogCard mutt={dog} key={dog.name} />;
    })

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="cards-container">
          {dogCards}
        </div>
      </div>
    );
  }
}

class DogCard extends React.Component {

  handleClick(){
    console.log("You want to adopt", this.props.mutt.name);
  }

  render() {
    var mutt = this.props.mutt; //shortcut
    return (
      <div className="card">
        <div className="content">
          <img src={mutt.images[0]} alt={mutt.name} />
          <h3>{mutt.name} {mutt.adopted ? '(Adopted)' : ''}           
            <button className="btn btn-default btn-small pull-right" onClick={(e) => this.handleClick(e)}>
              Adopt me!
            </button>
          </h3>
          <p>{mutt.sex} {mutt.breed}</p>
        </div>
      </div>
    );
  }
}

export default PetApp;