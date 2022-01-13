import { projectList } from "./projectlist";
import { TodoItem } from "./todo-item";
import { Project } from "./project";
import { createNewTodo } from "./todo-item-helper";
import { createNewProject } from "./project-helper";
import { parseISO, format } from "date-fns";

function setData(projectList) {
  let myDataSerialized = JSON.stringify(projectList.getProjectList());
  localStorage.setItem("myData", myDataSerialized);
}

function renderPage(projectList) {
  if (JSON.parse(localStorage.getItem("myData")).length > 0) {
    let myDataDeserialized = JSON.parse(localStorage.getItem("myData"));
    myDataDeserialized.forEach((project) => {
      let todoArray = [];
      if (project.todoArray) {
        project.todoArray.forEach((todo) => {
          let newTodo = createNewTodo(
            todo.title,
            parseISO(todo.dueDate),
            todo.id,
            todo.done
          );
          todoArray.push(newTodo);
        });
      }
      let newProject = createNewProject(project.name, todoArray, project.id);
      projectList.addToProjectList(newProject);
    });
  } else {
    let myDataDeserialized = JSON.parse(
      JSON.stringify([
        {
          name: "The Odin Project",
          todoArray: [
            {
              title: "Finish the Todo-List Application",
              dueDate: "2022-01-04T23:44:24.494Z",
              id: 0,
              done: false,
            },
            {
              title: "Finish the Odin Project Fullstack JS",
              dueDate: "2022-03-31T22:00:00.000Z",
              id: 1,
              done: false,
            },
          ],
          id: 2,
        },
      ])
    );
    myDataDeserialized.forEach((project) => {
      let todoArray = [];
      if (project.todoArray) {
        project.todoArray.forEach((todo) => {
          let newTodo = createNewTodo(
            todo.title,
            parseISO(todo.dueDate),
            todo.id,
            todo.done
          );
          todoArray.push(newTodo);
        });
      }
      let newProject = createNewProject(project.name, todoArray, project.id);
      projectList.addToProjectList(newProject);
    });
  }
  renderProjects(projectList);
  renderToDos(projectList.getProjectList()[0]);
  document.getElementById("projects").children[3].classList.add("active");
}

function deleteTodo(e, currProject) {
  let index = e.target.parentElement.parentElement.parentElement.id;
  currProject.removeToDo(index);
  renderToDos(currProject);
  setData(projectList);
}

function closeAllPopups() {
  const addDiv = document.getElementById("add-div");
  const addProject = document.getElementById("add-project");
  if (addDiv.firstChild.classList.contains("deactivated")) {
    cancelTodoInput(
      addDiv.firstChild,
      addDiv.children[1].firstChild,
      addDiv.children[2].firstChild,
      addDiv.children[2].lastChild,
      addDiv.children[1].lastChild
    );
  }
  if (addProject.firstElementChild.classList.contains("deactivated")) {
    cancelProjectInput(
      addProject.firstElementChild,
      document.getElementById("add-project-input-id"),
      document.getElementsByClassName("add-project-input-button")[0],
      document.getElementsByClassName("cancel-project-input-button")[0]
    );
  }
}

function isEditOpen() {
  const container = document.getElementById("container");
  for (let i = 1; i < container.children.length; i++) {
    if (!container.children[i].classList.contains("hover")) {
      return true;
    }
  }
  return false;
}

function declineEditTodo(editedTodo, currDiv, currProject, element) {
  let title = document.createElement("div");
  title.textContent = editedTodo.getTitle();
  title.classList.add("todo-text");
  let finishedButton = document.createElement("button");
  finishedButton.innerHTML = `<i class="far fa-circle"></i>`;
  finishedButton.classList.add("todo-edit");
  finishedButton.addEventListener("click", (e) => {
    if (!isEditOpen()) {
      editDone(e, element);
    }
  });
  let duedate = document.createElement("div");
  duedate.textContent = format(editedTodo.getDueDate(), "dd-MM-yyyy");
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-times"></i>';
  let editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  let rightSideDiv = document.createElement("div");
  rightSideDiv.classList.add("right-side-todo");
  rightSideDiv.classList.add("delete-and-date-div");
  let leftSideDiv = document.createElement("div");
  leftSideDiv.classList.add("left-side-todo");
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e, currProject);
  });
  editButton.addEventListener("click", (e) => {
    editTodo(e, currProject, element);
  });
  leftSideDiv.append(finishedButton, title);
  rightSideDiv.append(duedate, editButton, deleteButton);
  currDiv.replaceChild(leftSideDiv, currDiv.firstChild);
  currDiv.replaceChild(rightSideDiv, currDiv.lastChild);
  currDiv.classList.add("hover");
}

function acceptEditTodo(
  editedTodo,
  currDiv,
  textInput,
  dateInput,
  currProject,
  element
) {
  let currDay = new Date();
  currDay.setHours(0, 0, 0, 0);
  if (
    textInput.value !== "" &&
    dateInput.value !== "" &&
    parseISO(dateInput.value) >= currDay
  ) {
    let newDate = parseISO(dateInput.value);
    let title = document.createElement("div");
    title.textContent = textInput.value;
    editedTodo.setTitle(textInput.value);
    title.classList.add("todo-text");
    let duedate = document.createElement("div");
    duedate.textContent = format(newDate, "dd-MM-yyyy");
    editedTodo.setDueDate(newDate);
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    let editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-edit"></i>`;
    let rightSideDiv = document.createElement("div");
    rightSideDiv.classList.add("right-side-todo");
    rightSideDiv.classList.add("delete-and-date-div");
    deleteButton.addEventListener("click", (e) => {
      deleteTodo(e, currProject);
    });
    editButton.addEventListener("click", (e) => {
      editTodo(e, currProject, element);
    });
    let finishedButton = document.createElement("button");
    finishedButton.innerHTML = `<i class="far fa-circle"></i>`;
    finishedButton.classList.add("todo-edit");
    finishedButton.addEventListener("click", (e) => {
      if (!isEditOpen()) {
        editDone(e, element);
      }
    });
    let leftSideDiv = document.createElement("div");
    leftSideDiv.classList.add("left-side-todo");
    leftSideDiv.append(finishedButton, title);
    rightSideDiv.append(duedate, editButton, deleteButton);
    currDiv.replaceChild(leftSideDiv, currDiv.firstChild);
    currDiv.replaceChild(rightSideDiv, currDiv.lastChild);
    currDiv.classList.add("hover");
    setData(projectList);
  }
}

function editTodo(e, currProject, element) {
  closeAllPopups();
  let currDiv = e.target.parentElement.parentElement.parentElement;
  if (currDiv.classList.contains("todo")) {
    currDiv.classList.remove("hover");
    let id = currDiv.id;
    let editedTodo = currProject.getToDos()[id];
    let textContent = editedTodo.getTitle();
    let date = format(editedTodo.getDueDate(), "yyyy-MM-dd");
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = textContent;
    textInput.classList.add("edit-todo-text");
    currDiv.replaceChild(textInput, currDiv.firstChild);
    let newRightSideDiv = document.createElement("div");
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = date;
    dateInput.classList.add("edit-todo-date");
    let accept = document.createElement("button");
    accept.classList.add("todo-edit");
    accept.innerHTML = `<i class="fas fa-check"></i>`;
    accept.addEventListener("click", (e) => {
      acceptEditTodo(
        editedTodo,
        currDiv,
        textInput,
        dateInput,
        currProject,
        element
      );
    });
    let decline = document.createElement("button");
    decline.classList.add("todo-edit");
    decline.innerHTML = `<i class="fas fa-times"></i>`;
    decline.addEventListener("click", (e) => {
      declineEditTodo(editedTodo, currDiv, currProject, element);
    });
    newRightSideDiv.append(dateInput, accept, decline);
    newRightSideDiv.classList.add("right-side-todo");
    currDiv.replaceChild(newRightSideDiv, currDiv.lastChild);
  }
}

function editDone(e, todo) {
  if (e.target.parentElement.classList.contains("todo-edit")) {
    if (
      e.target.parentElement.parentElement.lastChild.classList.contains(
        "finished"
      )
    ) {
      e.target.parentElement.parentElement.lastChild.classList.remove(
        "finished"
      );
    } else {
      e.target.parentElement.parentElement.lastChild.classList.add("finished");
    }
  } else {
    if (e.target.parentElement.lastChild.classList.contains("finished")) {
      e.target.parentElement.lastChild.classList.remove("finished");
    } else {
      e.target.parentElement.lastChild.classList.add("finished");
    }
  }
  todo.changeStatus();
}

function createTodo(element, currProject, container) {
  let todo = document.createElement("div");
  todo.id = element.getId();
  todo.classList.add("todo");
  todo.classList.add("hover");
  let title = document.createElement("div");
  let finishedButton = document.createElement("button");
  finishedButton.innerHTML = `<i class="far fa-circle"></i>`;
  finishedButton.classList.add("todo-edit");
  finishedButton.addEventListener("click", (e) => {
    if (!isEditOpen()) {
      editDone(e, element);
    }
  });
  title.innerHTML = element.getTitle();
  title.classList.add("todo-text");
  if (element.getStatus()) {
    title.classList.add("finished");
  }
  let duedate = document.createElement("div");
  duedate.textContent = format(element.getDueDate(), "dd-MM-yyyy");
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-times"></i>';
  let editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;
  let leftSideDiv = document.createElement("div");
  leftSideDiv.classList.add("left-side-todo");
  let rightSideDiv = document.createElement("div");
  rightSideDiv.classList.add("right-side-todo");
  rightSideDiv.classList.add("delete-and-date-div");
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e, currProject);
  });
  editButton.addEventListener("click", (e) => {
    editTodo(e, currProject, element);
  });
  leftSideDiv.append(finishedButton, title);
  rightSideDiv.append(duedate, editButton, deleteButton);
  todo.append(leftSideDiv, rightSideDiv);
  container.append(todo);
  setData(projectList);
}

function activateTodoInput(
  addToDoButton,
  addToDoInput,
  addToDoInputButton,
  cancelToDoInputButton,
  addToDoDate
) {
  closeAllPopups();
  addToDoButton.classList.add("deactivated");
  addToDoInput.classList.remove("deactivated");
  addToDoInputButton.classList.remove("deactivated");
  cancelToDoInputButton.classList.remove("deactivated");
  addToDoDate.classList.remove("deactivated");
}

function cancelTodoInput(
  addToDoButton,
  addToDoInput,
  addToDoInputButton,
  cancelToDoInputButton,
  addToDoDate
) {
  addToDoButton.classList.remove("deactivated");
  addToDoInput.classList.add("deactivated");
  addToDoInputButton.classList.add("deactivated");
  cancelToDoInputButton.classList.add("deactivated");
  addToDoInput.value = "";
  addToDoDate.classList.add("deactivated");
  addToDoDate.value = "";
}

function addNewTodo(
  currProject,
  addToDoButton,
  addToDoInput,
  addToDoInputButton,
  cancelToDoInputButton,
  container,
  addToDoDate
) {
  let currDay = new Date();
  currDay.setHours(0, 0, 0, 0);
  if (
    addToDoInput.value !== "" &&
    addToDoDate.value !== "" &&
    parseISO(addToDoDate.value) >= currDay
  ) {
    let isoDate = parseISO(addToDoDate.value);
    let newToDo = new TodoItem(addToDoInput.value, isoDate);
    currProject.addToDo(newToDo);
    currProject.setIDs();
    createTodo(newToDo, currProject, container);
    addToDoButton.classList.remove("deactivated");
    addToDoInput.classList.add("deactivated");
    addToDoInputButton.classList.add("deactivated");
    cancelToDoInputButton.classList.add("deactivated");
    addToDoInput.value = "";
    addToDoDate.classList.add("deactivated");
    addToDoDate.value = "";
  }
}

function activateTodoButton(currProject, container) {
  let addDiv = document.getElementById("add-div");
  let addToDoInput = document.createElement("input");
  addToDoInput.type = "text";
  addToDoInput.placeholder = "Task";
  addToDoInput.classList.add("add-todo-inp", "deactivated");
  let addToDoInputButton = document.createElement("button");
  addToDoInputButton.classList.add("add-todo-inp-button", "deactivated");
  addToDoInputButton.textContent = "Add";
  let cancelToDoInputButton = document.createElement("button");
  cancelToDoInputButton.classList.add("cancel-todo-inp-button", "deactivated");
  cancelToDoInputButton.textContent = "Cancel";
  let addToDoButton = document.createElement("button");
  addToDoButton.classList.add("add-todo");
  addToDoButton.innerHTML = `<i class="fas fa-plus"></i> New Task`;
  let addToDoDate = document.createElement("input");
  addToDoDate.type = "date";
  addToDoDate.classList.add("add-todo-inp-date", "deactivated");
  let todoButtonContainer = document.createElement("div");
  todoButtonContainer.classList.add("todo-button-container");
  todoButtonContainer.append(addToDoInputButton, cancelToDoInputButton);
  let todoInputContainer = document.createElement("div");
  todoInputContainer.classList.add("todo-input-container");
  todoInputContainer.append(addToDoInput, addToDoDate);
  addDiv.textContent = "";
  addDiv.append(addToDoButton, todoInputContainer, todoButtonContainer);
  addToDoButton.addEventListener("click", () => {
    if (!isEditOpen()) {
      activateTodoInput(
        addToDoButton,
        addToDoInput,
        addToDoInputButton,
        cancelToDoInputButton,
        addToDoDate
      );
    }
  });
  cancelToDoInputButton.addEventListener("click", () => {
    cancelTodoInput(
      addToDoButton,
      addToDoInput,
      addToDoInputButton,
      cancelToDoInputButton,
      addToDoDate
    );
  });
  addToDoInputButton.addEventListener("click", () => {
    addNewTodo(
      currProject,
      addToDoButton,
      addToDoInput,
      addToDoInputButton,
      cancelToDoInputButton,
      container,
      addToDoDate
    );
  });
}

function renderToDos(currProject) {
  currProject.setIDs();
  let currToDos = currProject.getToDos();
  const container = document.getElementById("container");
  container.textContent = "";
  let titleOfProject = document.createElement("h2");
  titleOfProject.textContent = currProject.getName();
  container.appendChild(titleOfProject);
  currToDos.forEach((element) => {
    createTodo(element, currProject, container);
  });
  activateTodoButton(currProject, container);
}

function createProject(element, projects) {
  let project = document.createElement("div");
  project.classList.add("project-nav");
  project.id = element.getId();
  let projectTextDiv = document.createElement("div");
  projectTextDiv.classList.add("project-text");
  projectTextDiv.textContent = element.getName();
  projectTextDiv.addEventListener("click", (e) => {
    if (!isEditOpen()) {
      changeActiveProject(e, projects);
    }
  });
  let projectDeleteDiv = document.createElement("div");
  projectDeleteDiv.classList.add("project-del");
  let projectDeleteButton = document.createElement("button");
  projectDeleteButton.innerHTML = '<i class="fas fa-times"></i>';
  projectDeleteButton.addEventListener("click", (e) => {
    if (!isEditOpen()) {
      deleteProject(e, projectList);
    }
  });
  projectDeleteDiv.appendChild(projectDeleteButton);
  project.append(projectTextDiv, projectDeleteDiv);
  projects.appendChild(project);
  setData(projectList);
}

function activateProjectInput(
  addProjectButton,
  addProjectInput,
  addProjectInputButton,
  cancelProjectInputButton
) {
  closeAllPopups();
  addProjectButton.classList.add("deactivated");
  addProjectInput.classList.remove("deactivated");
  addProjectInputButton.classList.remove("deactivated");
  cancelProjectInputButton.classList.remove("deactivated");
}

function cancelProjectInput(
  addProjectButton,
  addProjectInput,
  addProjectInputButton,
  cancelProjectInputButton
) {
  addProjectButton.classList.remove("deactivated");
  addProjectInput.classList.add("deactivated");
  addProjectInputButton.classList.add("deactivated");
  cancelProjectInputButton.classList.add("deactivated");
  addProjectInput.value = "";
}

function activateProjectButton(projects) {
  let addProjectButton =
    document.getElementsByClassName("new-project-button")[0];
  let addProjectInput = document.getElementById("add-project-input-id");
  let addProjectInputButton = document.getElementsByClassName(
    "add-project-input-button"
  )[0];
  let cancelProjectInputButton = document.getElementsByClassName(
    "cancel-project-input-button"
  )[0];
  addProjectButton.addEventListener("click", () => {
    if (!isEditOpen()) {
      activateProjectInput(
        addProjectButton,
        addProjectInput,
        addProjectInputButton,
        cancelProjectInputButton
      );
    }
  });
  cancelProjectInputButton.addEventListener("click", () => {
    cancelProjectInput(
      addProjectButton,
      addProjectInput,
      addProjectInputButton,
      cancelProjectInputButton
    );
  });
  addProjectInputButton.addEventListener("click", () => {
    addProject(
      addProjectInput.value,
      projectList,
      addProjectButton,
      addProjectInput,
      addProjectInputButton,
      cancelProjectInputButton,
      projects
    );
  });
}

function addTodayAndWeek(projects) {
  let todayDiv = document.createElement("div");
  todayDiv.classList.add("project-nav");
  todayDiv.id = 0;
  todayDiv.textContent = "Today";
  let daysDiv = document.createElement("div");
  daysDiv.classList.add("project-nav");
  daysDiv.textContent = "Next week";
  daysDiv.id = 1;
  todayDiv.addEventListener("click", (e) => {
    changeActiveProject(e, projects);
  });
  daysDiv.addEventListener("click", (e) => {
    changeActiveProject(e, projects);
  });
  let hr = document.createElement("hr");
  projects.append(todayDiv, daysDiv, hr);
}

function renderProjects(projectList) {
  projectList.setIds();
  let currProjects = projectList.getProjectList();
  let projects = document.getElementById("projects");
  projects.textContent = "";
  addTodayAndWeek(projects);
  currProjects.forEach((element) => {
    createProject(element, projects);
  });
  activateProjectButton(projects);
  setData(projectList);
}

function renderSpecial(projectList, e) {
  const container = document.getElementById("container");
  container.textContent = "";
  let titleOfProject = document.createElement("h2");
  titleOfProject.textContent = e.target.textContent;
  container.appendChild(titleOfProject);
  if (e.target.textContent === "Today") {
    for (let i = 0; i < projectList.getProjectList().length; i++) {
      let project = projectList.getProjectList()[i];
      for (let j = 0; j < project.getToDos().length; j++) {
        let todo = project.getToDos()[j];
        let today = new Date();
        let possibleCandidate = todo.getDueDate();
        possibleCandidate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (
          format(today, "yyyy-mm-dd") ===
          format(possibleCandidate, "yyyy-mm-dd")
        ) {
          createTodo(todo, e.target, container);
        }
      }
    }
  } else {
    for (let i = 0; i < projectList.getProjectList().length; i++) {
      let project = projectList.getProjectList()[i];
      for (let j = 0; j < project.getToDos().length; j++) {
        let todo = project.getToDos()[j];
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let possibleCandidate = todo.getDueDate();
        possibleCandidate.setHours(0, 0, 0, 0);
        let difference = possibleCandidate.getTime() - today.getTime();
        if (difference < 604800000 && difference >= 0) {
          createTodo(todo, e.target, container);
        }
      }
    }
  }
}

function changeActiveProject(e, projects) {
  for (let item of projects.children) {
    item.classList.remove("active");
  }
  closeAllPopups();
  if (
    e.target.textContent === "Today" ||
    e.target.textContent === "Next week"
  ) {
    e.target.classList.add("active");
    renderSpecial(projectList, e);
  } else {
    let projectID = e.target.parentElement.id;
    e.target.parentElement.classList.add("active");
    renderToDos(projectList.getProjectList()[projectID - 2]);
  }
}

function deleteProject(e, projectList) {
  let index = e.target.parentElement.parentElement.parentElement.id;
  projectList.deleteProject(index);
  setData(projectList);
  renderProjects(projectList);
  let container = document.getElementById("container");
  container.textContent = "";
}

function addProject(
  value,
  projectList,
  addProjectButton,
  addProjectInput,
  addProjectInputButton,
  cancelProjectInputButton,
  projects
) {
  if (value !== "") {
    let newProject = new Project(value, [], 0);
    projectList.addToProjectList(newProject);
    projectList.setIds();
    createProject(newProject, projects);
    setData(projectList);
    addProjectButton.classList.remove("deactivated");
    addProjectInput.classList.add("deactivated");
    addProjectInputButton.classList.add("deactivated");
    cancelProjectInputButton.classList.add("deactivated");
    addProjectInput.value = "";
  }
}

export { renderPage };
