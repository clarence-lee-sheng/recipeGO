import React from 'react';
import logo from './logo.svg';
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Redirect,
  Link
} from "react-router-dom"

import './App.scss';

import CaptureScreen from "./pages/captureScreen/captureScreen"
import LandingPage from "./pages/landingPage/landingPage"

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path="/">
                  <LandingPage/>
                  <button><Link to="/login">login Page</Link></button>
              </Route>
              <Route path="/login">
                  <div>login page</div>
                  <button><Link to="/capture">Capture Page</Link></button>
              </Route>
              <Route path="/capture">
                  <CaptureScreen/>
              </Route>
              <Redirect to="/"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
