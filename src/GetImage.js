import React from 'react';
import { Link, hashHistory } from 'react-router';
//import { uploadPhoto } from './FirebaseAuth';
import ImageUploader from 'react-firebase-image-uploader';
import { storageRef } from './FirebaseConstants';
import Progress from 'react-progressbar';

class GetImagePage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      localUrl: "",
      url: ""
    }; 

    //function binding
    this.handleChange = this.handleChange.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  //update state for specific field
  handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;
    var changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
    console.log(this.state);
  }

  //handle signIn button
  uploadPhoto(event) {
    event.preventDefault(); //don't submit
    var state = this.state;
    console.log(state);
    //var test = {food0: "banana", food1: "brocolli"};
    hashHistory.push({
      pathname: '/scan',
      state: { state }
    });
  }

  handleUploadStart() {
    //console.log("start");
    this.setState({isUploading: true, progress: 0});
  }
  handleProgress(progress) {
    //console.log("progress");
    this.setState({progress});
  }
  handleUploadError(error) {
    this.setState({isUploading: false});
    //console.error(error);
  }
  handleUploadSuccess(filename) {
    this.setState({progress: 100, isUploading: false});
    storageRef.child(filename).getDownloadURL().then(url => this.setState({localUrl: url}));
    console.log(this.state);
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
        <div className="row">
          <h3>Web URL:</h3>
          <form role="form">  
            <div className="row">
              <div className="col-xs-12">
                <div className="input-group input-group-lg">
                  <input id="url" name="url" type="text" className="form-control" onChange={this.handleChange} />
                  <div className="input-group-btn">
                  <button type="submit" className="btn" onClick={(e) => this.uploadPhoto(e)}>Upload</button>
                </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <h3>Local Image:</h3>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <ImageUploader
              name="food"
              storageRef={storageRef}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <p id="progress">Progress: {this.state.progress}</p>
            <Progress completed={this.state.progress} />
            <button className="btn btn-success btn-lg" onClick={(e) => this.uploadPhoto(e)}>Upload Local</button>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6">
            {this.state.localUrl && 
              <img className="img-thumbnail" src={this.state.localUrl} alt="local" />
            }
          </div>
        </div>
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
      </div>
    );
  }  
}

export default GetImagePage;