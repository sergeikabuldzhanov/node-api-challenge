import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { Switch, Route } from "react-router-dom";
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
        console.log(response);
        
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
        
      });
    setloading(false);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <ProjectList {...props} projects={projects} />}
          />
          <Route
            exact
            path="/projects/:id"
            render={props => <ProjectDetails {...props} project={projects} />}
          />
        </Switch>
      </header>
    </div>
  );
}

export default App;
