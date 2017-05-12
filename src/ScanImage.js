import React from 'react';

class ScanPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      url: "",
    }; 

    //function binding
    this.handleChange = this.handleChange.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;
    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    //console.log(changes)
    this.setState(changes); //update state
  }

  render() {
    //var dogName = this.props.params.dogName;

    //var dogObj =  _.find(DOG_DATA, {name: dogName}); //find dog in data (hack)

    //make a bootstrap carousel (cause fun)
    /*
    var carouselItems = dogObj.images.map(function(img){
      return (
        <Carousel.Item key={img}>
          <img src={img} alt={dogObj.name} />
        </Carousel.Item>
      );     
    })

    <input type="text" className="form-control" />
           <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={(e) => this.handleClickUploadImage(e)}>Go!</button>
           </span>
    */

    return (
      <div>
        <h2 className="text-center">Upload Image</h2>
                <ValidatedInput field="text" type="text" changeCallback={this.handleChange} />
      </div>
    );
  }
}

//component that displays an field with given validation styling
class ValidatedInput extends React.Component {
  render() {
    return (
      <div className="input-group text-center">
        <input id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">Go!</button>
        </span>
      </div>
    );
  }  
}

export default ScanPage;