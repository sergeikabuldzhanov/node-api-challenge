import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }) {
  return (
    <>
      {projects.map(project => (
        <ProjectCard />
      ))}
    </>
  );
}
