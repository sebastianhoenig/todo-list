import { Project } from "./project.js";

// gets called when "add is pressed"
function createNewProject(title, todoArray, id) {
  // takes user input and current list of projects and appends project
  let project = new Project(title, todoArray, id);
  return project;
}

function deleteToDo(index, project) {
  project.deleteToDo(index);
}

export { createNewProject, deleteToDo };
