import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function ProjectDetails(props) {
  const { id } = props.match.params;
  const [actions, setActions] = useState([]);
  const project = props.project.find(elem => elem.id == id);
  const { description, name, completed } = project;
  console.log(completed);

  useEffect(() => {
    Axios.get(`/api/projects/${id}/actions`)
      .then(response => {
        setActions(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <article>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Completed:{completed.toString()}</p>
      <ul>
        {actions.map(action => (
          <li>{action.description}</li>
        ))}
      </ul>
      <Link to={`/`}>
        <button type="button">Back</button>
      </Link>
    </article>
  );
}
