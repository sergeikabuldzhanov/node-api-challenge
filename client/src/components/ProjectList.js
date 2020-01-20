import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectList(props) {
  return (
    <>
      {props.projects.map(project => (
        <ProjectCard project={project} history={props.history}/>
      ))}
    </>
  );
}
