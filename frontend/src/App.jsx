import React from 'react';
import logo from './logo.svg';
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Redirect
} from "react-router-dom"

import './App.scss';

import CaptureScreen from "./pages/captureScreen/captureScreen"

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route path="/login">
                  <div>login page</div>
              </Route>
              <Route path="/capture">
                  <CaptureScreen/>
              </Route>
              <Redirect to="login"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
