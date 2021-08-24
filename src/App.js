import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddStudent from './components/Student/AddStudent';
import AddCourse from './components/Course/AddCourse';
import Navbar from './components/NavBar/Navbar';

// This is the first compenent for React (JSX)
function App() {
  return (
    <Router>
      <div>
        < Navbar />
        <Switch>
          <Route exact path="/addStudent">
            <AddStudent />
          </Route>
          <Route exact path="/addCourse">
            <AddCourse />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
