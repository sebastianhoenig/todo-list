class Project {
  constructor(name, todoArray, id) {
    this.name = name;
    this.todoArray = todoArray;
    this.id = id;
  }

  setIDs() {
    for (let i = 0; i < this.todoArray.length; i++) {
      this.todoArray[i].setId(i);
    }
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  addToDo(todo) {
    this.todoArray.push(todo);
  }

  removeToDo(index) {
    console.log(this.todoArray);
    this.todoArray.splice(index, 1);
    console.log(this.todoArray);
  }

  getToDos() {
    return this.todoArray;
  }

  setId(i) {
    this.id = i;
  }

  getId() {
    return this.id;
  }
}

export { Project };
