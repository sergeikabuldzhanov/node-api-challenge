import React from "react";

export default function ProjectDetails({ project, history, match }) {
  const { id } = match.params;
  const { description, name, completed, actions } = project.find(
    project => project.id === id
  );
  return (
    <article>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Completed:{completed}</p>
      <ul>
        {actions.map(action => (
          <li>{action.description}</li>
        ))}
      </ul>
      <button type="button" onClick={() => history.push(`/`)}>
        Back
      </button>
    </article>
  );
}
