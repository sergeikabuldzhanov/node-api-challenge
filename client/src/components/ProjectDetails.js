import React from "react";

export default function ProjectDetails(props) {
    const { id } = props.match.params;
    debugger
    const { description, name, completed } = props.project.find(
    project => project.id === id
  );
  return (
    <article>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Completed:{completed}</p>
{/*       <ul>
        {actions.map(action => (
          <li>{action.description}</li>
        ))}
      </ul> */}
      <button type="button" onClick={() => props.history.push(`/`)}>
        Back
      </button>
    </article>
  );
}
