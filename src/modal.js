import { $container, createElement } from "./index";
import { alerter } from "./alerts";
import { renderElement, renderData } from "./mainContent";
import {
  daysToWeeks,
  formatDistance,
  formatDistanceStrict,
  formatDistanceToNow,
  parseISO,
  quartersToYears,
  subDays,
} from "date-fns";
import "./styles/modal.css";
function render(type, nodeObject) {
  const target = $container.querySelector("#main");
  const $dialog = target.querySelector(".modal");
  // alerter(target);
  if (type == "addTask") {
    const $dialogHeader = createElement("div", null, ["modalHeader"], null);
    const $dialogTitle = createElement("h2", null, ["modalTitle"], "Add Task");
    const $dialogClose = createElement("button", null, ["modalClose"], "X");
    document.addEventListener("click", (e) => {
      if (e.target.matches(".modalClose")) {
        $dialog.close();
        $dialog.innerHTML = "";
      }
    });
    $dialogHeader.append($dialogTitle, $dialogClose);
    const $dialogBody = createElement("div", null, ["modalBody"], null);
    const $dialogForm = createElement("form", null, ["modalForm"], null);
    const $dialogFormTitle = createElement(
      "label",
      null,
      ["modalFormTitle"],
      "Title"
    );
    const $dialogFormTitleInput = createElement(
      "input",
      null,
      ["modalFormTitleInput"],
      null
    );
    $dialogFormTitleInput.type = "text";
    $dialogFormTitleInput.name = "title";
    $dialogFormTitleInput.required = true;
    $dialogFormTitleInput.placeholder = "Title";
    $dialogFormTitleInput.autocomplete = "off";
    $dialogFormTitleInput.autofocus = true;
    $dialogFormTitle.append($dialogFormTitleInput);

    const $dialogFormProject = createElement(
      "label",
      null,
      ["modalFormProject"],
      "Project"
    );
    const $dialogFormProjectInput = createElement(
      "select",
      null,
      ["modalFormProjectInput"],
      null
    );
    $dialogFormProject.append($dialogFormProjectInput);
    const projects = localStorage.getItem("projects").split(",");
    projects.forEach((element) => {
      const $dialogFormProjectOption = createElement(
        "option",
        null,
        ["modalFormProjectOption"],
        element
      );
      $dialogFormProjectOption.value = element;
      $dialogFormProjectInput.append($dialogFormProjectOption);
    });

    const $dialogFormDesc = createElement(
      "label",
      null,
      ["modalFormDesc"],
      "Description"
    );
    const $dialogFormDescInput = createElement(
      "input",
      null,
      ["modalFormDescInput"],
      null
    );
    $dialogFormDescInput.type = "text";
    $dialogFormDescInput.name = "description";
    $dialogFormDescInput.required = true;
    $dialogFormDescInput.placeholder = "Description";
    $dialogFormDescInput.autocomplete = "off";
    $dialogFormDesc.append($dialogFormDescInput);
    const $dialogFormDate = createElement(
      "label",
      null,
      ["modalFormDate"],
      "Date"
    );
    const $dialogFormDateInput = createElement(
      "input",
      null,
      ["modalFormDateInput"],
      null
    );
    $dialogFormDateInput.type = "datetime-local";
    $dialogFormDateInput.name = "date";
    $dialogFormDateInput.required = true;
    $dialogFormDateInput.placeholder = "Date";
    $dialogFormDateInput.autocomplete = "off";
    $dialogFormDate.append($dialogFormDateInput);
    const $dialogFormPriority = createElement(
      "label",
      null,
      ["modalFormPriority"],
      "Priority"
    );

    const $dialogFormPriorityInput = createElement(
      "select",
      null,
      ["modalFormPriorityInput"],
      null
    );
    $dialogFormPriority.append($dialogFormPriorityInput);
    const $dialogFormPriorityInputOption1 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "High"
    );
    $dialogFormPriorityInputOption1.value = "High";

    const $dialogFormPriorityInputOption2 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "Medium"
    );

    $dialogFormPriorityInputOption2.value = "Medium";

    const $dialogFormPriorityInputOption3 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "Low"
    );
    $dialogFormPriorityInputOption3.value = "Low";

    $dialogFormPriorityInput.append(
      $dialogFormPriorityInputOption1,
      $dialogFormPriorityInputOption2,
      $dialogFormPriorityInputOption3
    );
    const $dialogFormSubmit = createElement(
      "button",
      null,
      ["modalFormSubmit"],
      "Add"
    );
    $dialogFormSubmit.type = "submit";
    $dialogFormSubmit.value = "Add";
    $dialogFormSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const title = $dialogFormTitleInput.value;
      const description = $dialogFormDescInput.value;
      const date = $dialogFormDateInput.value;
      const priority = $dialogFormPriorityInput.value;
      const project = $dialogFormProjectInput.value;
      if (!title || !description || !date || !priority) {
        alert("Please fill all the fields");
        return;
      }
      let localData = localStorage.getItem("data");
      localData = localData ? localData : "[]";
      let data = JSON.parse(localData);

      const id = Date.now();
      let toInsert = {
        id: id,
        title: title,
        description: description,
        category: "todo",
        project: project,
        dueDate: date,
        priority: priority,
      };
      // console.log(toInsert);
      data.push(toInsert);
      const newData = JSON.stringify(data);
      localStorage.setItem("data", newData);

      renderElement(toInsert);
      $dialog.innerHTML = "";
      $dialog.close();
    });

    $dialogForm.append(
      $dialogFormTitle,
      $dialogFormDesc,

      $dialogFormDate,
      $dialogFormProject,
      $dialogFormPriority,
      $dialogFormSubmit
    );

    $dialogBody.append($dialogHeader, $dialogForm);
    $dialog.append($dialogBody);
  }

  // edit task

  if (type == "editTask") {
    let localData = localStorage.getItem("data");
    localData = localData ? localData : "[]";
    let data = JSON.parse(localData);
    const HTMLElement = nodeObject.querySelector(".todoChildContent");
    // alerter(HTMLElement);
    const ID = nodeObject.dataset.todoId;
    const object = data.find((item) => item.id == ID);
    const newData = JSON.stringify(data);
    localStorage.setItem("data", newData);

    // console.log(object);

    const $dialogHeader = createElement("div", null, ["modalHeader"], null);
    const $dialogTitle = createElement("h2", null, ["modalTitle"], "Add Task");
    const $dialogClose = createElement("button", null, ["modalClose"], "X");
    document.addEventListener("click", (e) => {
      if (e.target.matches(".modalClose")) {
        $dialog.close();
        $dialog.innerHTML = "";
      }
    });
    $dialogHeader.append($dialogTitle, $dialogClose);
    const $dialogBody = createElement("div", null, ["modalBody"], null);
    const $dialogForm = createElement("form", null, ["modalForm"], null);
    const $dialogFormTitle = createElement(
      "label",
      null,
      ["modalFormTitle"],
      "Title"
    );
    const $dialogFormTitleInput = createElement(
      "input",
      null,
      ["modalFormTitleInput"],
      null
    );
    $dialogFormTitleInput.type = "text";
    $dialogFormTitleInput.name = "title";
    $dialogFormTitleInput.required = true;
    $dialogFormTitleInput.placeholder = "Title";
    $dialogFormTitleInput.autocomplete = "off";
    $dialogFormTitleInput.autofocus = true;
    $dialogFormTitleInput.value = object.title;

    const $dialogFormDesc = createElement(
      "label",
      null,
      ["modalFormDesc"],
      "Description"
    );
    const $dialogFormDescInput = createElement(
      "input",
      null,
      ["modalFormDescInput"],
      null
    );
    $dialogFormDescInput.type = "text";
    $dialogFormDescInput.name = "description";
    $dialogFormDescInput.required = true;
    $dialogFormDescInput.placeholder = "Description";
    $dialogFormDescInput.autocomplete = "off";
    $dialogFormDescInput.value = object.description;

    const $dialogFormDate = createElement(
      "label",
      null,
      ["modalFormDate"],
      "Due Date"
    );
    const $dialogFormDateInput = createElement(
      "input",
      null,
      ["modalFormDateInput"],
      null
    );
    $dialogFormDateInput.type = "datetime-local";
    $dialogFormDateInput.name = "date";
    $dialogFormDateInput.required = true;
    $dialogFormDateInput.placeholder = "Due Date";
    $dialogFormDateInput.autocomplete = "off";
    $dialogFormDateInput.value = object.dueDate;

    const $dialogFormPriority = createElement(
      "label",
      null,
      ["modalFormPriority"],
      "Priority"
    );
    const $dialogFormPriorityInput = createElement(
      "select",
      null,
      ["modalFormPriorityInput"],
      null
    );
    $dialogFormPriorityInput.name = "priority";
    $dialogFormPriorityInput.required = true;
    $dialogFormPriorityInput.placeholder = "Priority";
    $dialogFormPriorityInput.autocomplete = "off";
    $dialogFormPriorityInput.value = object.priority;

    const $dialogFormPriorityInputOption1 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "High"
    );
    $dialogFormPriorityInputOption1.value = "High";
    const $dialogFormPriorityInputOption2 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "Medium"
    );
    $dialogFormPriorityInputOption2.value = "Medium";
    const $dialogFormPriorityInputOption3 = createElement(
      "option",
      null,
      ["modalFormPriorityInputOption"],
      "Low"
    );
    $dialogFormPriorityInputOption3.value = "Low";

    $dialogFormPriorityInput.append(
      $dialogFormPriorityInputOption1,
      $dialogFormPriorityInputOption2,
      $dialogFormPriorityInputOption3
    );

    const $dialogFormSubmit = createElement(
      "button",
      null,
      ["modalFormSubmit"],
      "Submit"
    );
    $dialogFormSubmit.type = "submit";
    $dialogFormSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const title = $dialogFormTitleInput.value;
      const description = $dialogFormDescInput.value;
      const date = $dialogFormDateInput.value;
      const priority = $dialogFormPriorityInput.value;
      const toInsert = {
        id: ID,
        title: title,
        category: object.category,
        project: object.project,
        description: description,
        dueDate: date,
        priority: priority,
      };
      // console.log(toInsert);
      const index = data.findIndex((item) => item.id == ID);
      data[index] = toInsert;
      const newData = JSON.stringify(data);
      localStorage.setItem("data", newData);
      // alerter(HTMLElement);
      let ElementTitle = HTMLElement.querySelector(".todoChildTitle");
      ElementTitle.textContent = toInsert.title;

      let ElementDate = HTMLElement.querySelector(".todoChildDate");
      const compareDate = parseISO(toInsert.dueDate) - new Date();
      if (compareDate < 0) {
        ElementDate.parentElement.parentElement.classList.add(
          "todoChildOverdue"
        );
      }
      ElementDate.textContent =
        (compareDate < 0 ? "Due by " : "In ") +
        formatDistanceToNow(parseISO(toInsert.dueDate));

      let ElementPriority = HTMLElement.querySelector(".todoChildPriority");
      ElementPriority.textContent = toInsert.priority;
      // alerter(HTMLElement);
      $dialog.close();
      $dialog.innerHTML = "";
    });

    $dialogFormTitle.append($dialogFormTitleInput);
    $dialogFormDesc.append($dialogFormDescInput);
    $dialogFormDate.append($dialogFormDateInput);
    $dialogFormPriority.append($dialogFormPriorityInput);
    $dialogForm.append(
      $dialogFormTitle,
      $dialogFormDesc,
      $dialogFormDate,
      $dialogFormPriority,
      $dialogFormSubmit
    );

    $dialogBody.append($dialogHeader, $dialogForm);
    $dialog.append($dialogBody);
  }

  // empty space

  if (type == "addProject") {
    const projects = localStorage.getItem("projects").split(",");

    const $dialogHeader = createElement("div", null, ["modalHeader"], null);
    const $dialogTitle = createElement(
      "h2",
      null,
      ["modalTitle"],
      "Add Project"
    );
    const $dialogClose = createElement("button", null, ["modalClose"], "X");
    document.addEventListener("click", (e) => {
      if (e.target.matches(".modalClose")) {
        $dialog.close();
        $dialog.innerHTML = "";
      }
    });
    $dialogHeader.append($dialogTitle, $dialogClose);
    const $dialogBody = createElement("div", null, ["modalBody"], null);
    const $dialogForm = createElement("form", null, ["modalForm"], null);
    const $dialogFormTitle = createElement(
      "label",
      null,
      ["modalFormTitle"],
      "Title"
    );
    const $dialogFormTitleInput = createElement(
      "input",
      null,
      ["modalFormTitleInput"],
      null
    );
    $dialogFormTitleInput.type = "text";
    $dialogFormTitleInput.name = "title";
    $dialogFormTitleInput.required = true;
    $dialogFormTitleInput.placeholder = "Title";
    $dialogFormTitleInput.autocomplete = "off";

    const $dialogFormSubmit = createElement(
      "button",
      null,
      ["modalFormSubmit"],
      "Submit"
    );
    $dialogFormSubmit.type = "submit";
    $dialogFormSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const title = $dialogFormTitleInput.value;
      if (title == "") {
        alert("Please enter a title");
        return;
      }
      projects.push(title);
      localStorage.setItem("projects", projects);
      const $projectList = document
        .querySelector("#secondCategory")
        .querySelector("ul");
      const $project = createElement("li", null, ["secondCategoryItem"], null);
      $project.dataset.secondCategoryItem = title;
      $project.textContent = title;
      $project.addEventListener("click", () => {
        renderData(title);
      });
      $projectList.append($project);
      $dialog.close();
      $dialog.innerHTML = "";
    });
    $dialogFormTitle.append($dialogFormTitleInput);
    $dialogForm.append($dialogFormTitle, $dialogFormSubmit);
    $dialogBody.append($dialogHeader, $dialogForm);
    $dialog.append($dialogBody);
  }
  target.append($dialog);
}
function renderInitialModal() {
  const target = $container.querySelector("#main");
  const $dialog = createElement("dialog", null, ["modal"], null);
  target.append($dialog);
}

export { render as renderModal, renderInitialModal };
