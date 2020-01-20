import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard(props) {
    const {id, description, name, completed} = props.project;
    return(
        <article>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Completed:{completed}</p>
            <Link to={`/projects/${id}`}>
            <button type = "button" >Details</button>
            </Link>
        </article>
    )   
}