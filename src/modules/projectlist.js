import { createNewTodo } from "./todo-item-helper";
import { createNewProject } from "./project-helper";
import { parseISO } from "date-fns";

const projectList = (() => {
  let items = [];

  // Create an example Project with ToDo
  // let exampleProject = createNewProject("The Odin Project", [], 0);
  // items.push(exampleProject);
  // let exampleToDo = createNewTodo(
  //   "Finish the Todo-List Application",
  //   new Date(),
  //   0,
  //   false
  // );

  // let exampleToDo2 = createNewTodo(
  //   "Finish the Odin Project Fullstack JS",
  //   parseISO("2022-04-01"),
  //   0,
  //   false
  // );

  // exampleProject.addToDo(exampleToDo);
  // exampleProject.addToDo(exampleToDo2);

  const getProjectList = () => {
    return items;
  };

  const addToProjectList = (newProject) => {
    items.push(newProject);
  };

  const deleteProject = (index) => {
    items.splice(index - 2, 1);
  };

  const setIds = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].setId(2 + i);
    }
  };

  return { getProjectList, addToProjectList, deleteProject, setIds };
})();

export { projectList };
