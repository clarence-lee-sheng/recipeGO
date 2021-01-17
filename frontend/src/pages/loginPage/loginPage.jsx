import React, { useRef, useEffect, useState } from "react"
import "./loginPage.styles.scss"

import { 
  Link
} from "react-router-dom"

const { Component } = React

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '744e6239',
  apiSecret: 'R3gmpxcUBGmavDSO',
});

class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "signUp"
    }
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <ul> 
                <li>
                  <label for="username">Username:</label>
                  <input type="username" id="username" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required/>
                </li>
                <li>
                  <label for="phonenum">Phone number:</label>
                  <input type="text" id="phonenum" required/>
                </li>
              </ul>
            </fieldset>
            <button type="button"  onClick={ () => this.changeView("PWReset")} href="#">Create Account</button>
            <button type="button"  onClick={ () => this.changeView("logIn")}>Have an Account?</button>
          </form>
        )
        break
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <fieldset>
              <ul>
                <li>
                  <label for="phonenum">Phone number:</label>
                  <input type="text" id="phonenum" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button className="login-btn"><Link className="login-btn-link" to="/capture">Login</Link></button>
            <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
          </form>
        )
        break
      case "PWReset":
          console.log(document.getElementById("phonenum").value);
        nexmo.verify.request({
         //  number: 'document.getElementById("phonenum").value',
           number: '15199028700',
            brand: 'Vonage',
            code_length: '4'
          }, (err, result) => {
            console.log(err ? err : result)
          });
        return (
          <form>
          <h2>Verify phone number</h2>
          <fieldset>
            <ul>
              <li>
                <em>A PIN code was sent to your phone number!</em>
              </li>
              <li>
                <label for="pin">PIN received:</label>
                <input type="pin" id="pin" required/>
              </li>
            </ul>
          </fieldset>
          <button type="button" onClick={ () => this.changeView("confirmPIN")}>Verify</button>
          <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
        </form>
        )
        case "confirmPIN":
            console.log("confirming")
            nexmo.verify.check({
                request_id: 'abe401eecd2744d290058eaf0e8ef182',
                code: '1520'
              }, (err, result) => {
                console.log(err ? err : result)
                
              });
            return(
                <form>
                <h5>Success! Phone number was verified.</h5>
                <h5>You can now log in with your account.</h5>                 
                </form>  
            ) 
      default:
        break
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    )
  }
}

export default LoginScreen
