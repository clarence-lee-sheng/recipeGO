import React, {useEffect, useState} from 'react';
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Redirect,
  Link
} from "react-router-dom"

import './App.scss';

import CaptureScreen from "./pages/captureScreen/captureScreen"
import LoginScreen from "./pages/loginPage/loginPage"
import LandingPage from "./pages/landingPage/landingPage"
import RecipesPage from "./pages/recipesPage/recipesPage"

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route path="/login">
                  <LoginScreen/>
                  <button><Link to="/capture">Capture Page</Link></button>
              </Route>
              <Route path="/capture">
                  <CaptureScreen/>
              </Route>
              <Redirect to="/login"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
