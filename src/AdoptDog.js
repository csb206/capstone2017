import React from 'react';
import _ from 'lodash';
import { Carousel, Button } from 'react-bootstrap';
import DOG_DATA from './dog-data'; //load the dog data to use

class AdoptPage extends React.Component {
  render() {
    var dogName = undefined;
    console.log("DEBUG: must define `dogName`");

    var dogObj =  _.find(DOG_DATA, {name: dogName}); //find dog in data (hack)

    //make a bootstrap carousel (cause fun)
    var carouselItems = dogObj.images.map(function(img){
      return (
        <Carousel.Item key={img}>
          <img src={img} alt={dogObj.name} />
        </Carousel.Item>
      );     
    })

    return (
      <div>
        <h2>Adopt {dogObj.name}</h2>
        <p className="lead">{dogObj.sex} {dogObj.breed}</p>
        <Carousel className="adopt-carousel">
          {carouselItems}
        </Carousel>
        <Button bsSize="large" bsStyle="primary">Adopt me now!</Button>
      </div>
    );
  }
}

export default AdoptPage;