class TodoItem {
  constructor(title, date, id, done) {
    this.title = title;
    this.dueDate = date;
    this.id = id;
    this.done = done;
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  changeStatus() {
    this.done = !this.done;
  }

  getStatus() {
    return this.done;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  setDueDate(newDate) {
    this.dueDate = newDate;
  }

  getTitle() {
    return this.title;
  }

  getDueDate() {
    return this.dueDate;
  }
}

export { TodoItem };
