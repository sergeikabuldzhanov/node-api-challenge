import React from 'react';

export default function ProjectCard({project, history}) {
    const {id, description, name, completed} = project;
    return(
        <article>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Completed:{completed}</p>
            <button type = "button" onClick={()=>history.push(`/projects/${id}`)}>Details</button>
        </article>
    )   
}