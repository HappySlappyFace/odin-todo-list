import { alerter } from "./alerts";

class todo {
  constructor(title, description, project, category, dueDate, checklist) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.category = category;
    this.dueDate = dueDate;
    this.checklist = checklist;
  }
  get title() {
    return this._title;
  }
  set title(name) {
    if (name.length > 0) {
      this._title = name;
      return;
    }
    alerter("Title cannot be empty");
  }
  get description() {
    return this._description;
  }
  set description(name) {
    if (name.length > 0) {
      this._description = name;
      return;
    }
    alerter("Description cannot be empty");
  }
  get category() {
    return this._category;
  }
  set category(name) {
    if (name !== null) {
      this._category = name;
      return;
    }
    alerter("category cannot be empty");
  }
  get project() {
    return this._project;
  }
  set project(name) {
    if (name !== null) {
      this._project = name;
      return;
    }
    alerter("project cannot be empty");
  }
  get dueDate() {
    return this._dueDate;
  }
  set dueDate(date) {
    if (date != null) {
      this._dueDate = date;
      return;
    }
    alerter("invalid date");
  }
  get checklist() {
    return this._checklist;
  }
  set checklist(list) {
    if (list.length > 0) {
      this._checklist = list;
      return;
    }
    alerter("checklist empty");
  }
  get todoCompleted() {
    var todoCompletedResult = true;
    this.checklist.forEach((element) => {
      alerter(element.checked);
      if (element.checked !== true) {
        todoCompletedResult = false;
      }
    });
    return todoCompletedResult;
  }
  appendChecklistItem(text, checked) {
    this.checklist.push({ text: text, checked: checked });
  }
}
var data = [];
let test = new todo("title", "desc", "default", "health", "test", [
  { text: "hey", checked: true },
  { text: "test", checked: true },
]);
data.push(test);
data.push(test);
data.push(test);
// alerter(data);
test.appendChecklistItem("test", true);
test.appendChecklistItem("djej", true);

export { data, todo };
