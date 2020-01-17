import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import {Switch, Route} from 'react-router-dom';
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    Axios.get(`/api/projects`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
    setloading(false);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      <Switch>
        <Route exact path = '/'>
          <ProjectList projects={projects}/>
        </Route>
        <Route exact path = '/projects/:id'>
          <ProjectDetails project={projects}/>
        </Route>
      </Switch>
      </header>
    </div>
  );
}

export default App;
