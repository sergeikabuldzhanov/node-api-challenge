import React from 'react';

export default function ProjectCard(props) {
    const {id, description, name, completed} = props.project;
    return(
        <article>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Completed:{completed}</p>
            <button type = "button" onClick={()=>props.history.push(`/projects/${id}`)}>Details</button>
        </article>
    )   
}