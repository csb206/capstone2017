import React from 'react';
import { signUp } from './FirebaseAuth';
//import { Link, hashHistory } from 'react-router';

class JoinPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'confirmpassword': undefined,
      'handle':undefined
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
    this.setState(changes); //update state
  }

  //handle signUp button
  signUp(event) {
    event.preventDefault(); //don't submit
    signUp(this.state.email, this.state.password, this.state.handle);
  }

  //helper function to validate an input
  //value is the value being tested
  //validations is the test being performed
  validate(value, validations) {
    var errorChecker = {isValid: true, style:''};
    //make sure were checking something
    if (value !== undefined) {
      //check if field is required, if so must not be blank
      if (validations.required && value === '') {
        errorChecker.required = true;
        errorChecker.isValid = false;
      }
      //handle minLength
      if (validations.minLength && value.length < validations.minLength){
        errorChecker.minLength = validations.minLength;
        errorChecker.isValid = false;
      }

      //handle email type ??
      if (validations.email){
        //pattern comparison from w3c
        //https://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
        var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
        if (!valid) {
          errorChecker.email = true;
          errorChecker.isValid = false;
        }
      }

      if (validations.matches) {
        if (value !== validations.currentPassword) {
          errorChecker.matches = true;
          errorChecker.isValid = false;
        }
      }
    }

    //set styles for the result of the check
    //if there is an error
    if (!errorChecker.isValid) {
      errorChecker.style = 'has-error';
    } else if (value !== undefined) {
      //else there is no issues
      errorChecker.style = 'has-success';
    } else {
      //there is no input
      errorChecker.isValid = false;
    }
    return errorChecker;
  }


  render() {
    //field validation checks
    var emailErrors = this.validate(this.state.email, {required:true, email:true});
    var passwordErrors = this.validate(this.state.password, {required:true, minLength:6});
    var passwordConfirmErrors = this.validate(this.state.confirmpassword, {required:true, matches:true, currentPassword: this.state.password});
    var handleErrors = this.validate(this.state.handle, {required:true, minLength:1});

    //If there's errors, don't enable sign up
    //If no errors, allow sign up
    var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && handleErrors.isValid && passwordConfirmErrors.isValid);
    return (
      <form role="form" className="sign-up-form">
        <h2>Sign Up!</h2>

        <ValidatedInput field="email" type="email" label="Email" changeCallback={this.handleChange} errors={emailErrors} />

        <ValidatedInput field="handle" type="text" label="Handle" changeCallback={this.handleChange} errors={handleErrors} />

        <ValidatedInput field="password" type="password" label="Password" changeCallback={this.handleChange} errors={passwordErrors} />

        <ValidatedInput field="confirmpassword" type="password" label="Confirm Password" changeCallback={this.handleChange} errors={passwordConfirmErrors} />

        <div className="form-group sign-up-buttons">
          <button className="btn btn-primary" disabled={!signUpEnabled} onClick={(e) => this.signUp(e)}>Sign-up</button>
        </div>
      </form>
    );
  }
}

//component that displays an field with given validation styling
class ValidatedInput extends React.Component {
  render() {
    return (
      <div className={"form-group "+this.props.errors.style}>
        <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
        <input id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
        <ValidationErrors errors={this.props.errors} />
      </div>
    );
  }  
}

//component to represent and display validation errors
class ValidationErrors extends React.Component {
  render() {
    return (
      <div>
        {this.props.errors.required &&
          <p className="help-block">Required!</p>
        }
        {this.props.errors.email &&
          <p className="help-block">Not an email address!</p>
        }
        {this.props.errors.minLength &&
          <p className="help-block">Must be at least {this.props.errors.minLength} characters.</p>        
        }
        {this.props.errors.matches &&
          <p className="help-block">Passwords do not match</p>        
        }
      </div>
    );
  }
}

export default JoinPage;