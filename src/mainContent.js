import { $container, createElement } from "./index";
import {
  daysToWeeks,
  formatDistance,
  formatDistanceStrict,
  formatDistanceToNow,
  parseISO,
  quartersToYears,
  subDays,
} from "date-fns";
import { alerter } from "./alerts";
// import { data } from "./type";
import { renderModal, renderInitialModal } from "./modal";

import EditIcon from "./icons/Edit.svg";
import DeleteIcon from "./icons/delete.png";
import "./styles/mainContent.css";

let localData = localStorage.getItem("data");
localData = localData ? localData : "[]";
let data = JSON.parse(localData);
// data.splice(0, 2);
alerter(data);

const newData = JSON.stringify(data);
localStorage.setItem("data", newData);

function renderData(filter) {
  // alerter(json);

  if (filter == "all") {
    localData = localStorage.getItem("data");
    localData = localData ? localData : "[]";
    data = JSON.parse(localData);
  }
  if (filter == "today") {
    localData = localStorage.getItem("data");
    localData = localData ? localData : "[]";
    data = JSON.parse(localData);
    data = data.filter((element) => {
      const today = new Date();
      const dueDate = parseISO(element.dueDate);
      return (
        dueDate.getDate() == today.getDate() &&
        dueDate.getMonth() == today.getMonth() &&
        dueDate.getFullYear() == today.getFullYear()
      );
    });
  }
  if (filter == "next7days") {
    localData = localStorage.getItem("data");
    localData = localData ? localData : "[]";
    data = JSON.parse(localData);
    data = data.filter((element) => {
      const today = new Date();
      const dueDate = parseISO(element.dueDate);
      const next7days = subDays(today, -7);
      return (
        dueDate.getDate() <= next7days.getDate() &&
        dueDate.getMonth() <= next7days.getMonth() &&
        dueDate.getFullYear() <= next7days.getFullYear()
      );
    });
  }
  data = data.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
  document.querySelector(".todo").innerHTML = "";
  data.forEach((element) => renderElement(element));
}

function render() {
  renderInitialModal();

  const target = $container.querySelector("#main");
  const $contentContainer = createElement(
    "div",
    "contentContainer",
    null,
    null
  );
  const $content = createElement("div", "content", null, null);
  const $h2 = createElement("h2", null, null, "Category Name");
  const $optionsContainer = createElement("div", "todoContainer", null, null);
  const $todo = createElement("div", null, ["todo"], null);
  const $actionBar = createElement("div", "actionBar", null, null);
  const $actionBarButtons = ["Add Task", "Add Project"];
  $actionBarButtons.forEach((element) => {
    const $actionBarButton = createElement(
      "button",
      null,
      ["actionBarButton"],
      element
    );
    $actionBarButton.dataset.actionBarButton = element;
    $actionBar.append($actionBarButton);
  });
  $optionsContainer.append($h2);
  $optionsContainer.append($actionBar);

  $content.append($optionsContainer, $todo);
  $contentContainer.append($content);
  target.append($contentContainer);
  // renderData();
}
function renderElement(element) {
  // alerter(element);
  const target = $container.querySelector(".todo");
  const $todo = createElement("div", null, ["todoChild"], null);
  const $todoChildContent = createElement(
    "div",
    null,
    ["todoChildContent"],
    null
  );
  $todo.dataset.todoId = element.id;
  const $title = createElement(
    "h3",
    null,
    ["todoChildTitle", "todoChildElement"],
    element.title
  );
  // const $desc = createElement(
  //   "p",
  //   null,
  //   ["todoChildDesc", "todoChildElement"],
  //   element.description
  // );
  const $category = createElement(
    "p",
    null,
    ["todoChildCat", "todoChildElement"],
    element.category
  );
  const $project = createElement(
    "p",
    null,
    ["todoChildProj", "todoChildElement"],
    element.project
  );
  // alerter(parseISO(element.dueDate));
  const compareDate = parseISO(element.dueDate) - new Date();
  if (compareDate < 0) {
    $todo.classList.add("todoChildOverdue");
  }
  const $dueDate = createElement(
    "p",
    null,
    ["todoChildDate", "todoChildElement"],
    (compareDate < 0 ? "Due by " : "In ") +
      formatDistanceToNow(parseISO(element.dueDate))
  );
  const $priority = createElement(
    "p",
    null,
    ["todoChildPriority", "todoChildElement"],
    element.priority
  );
  const $todoActions = createElement("div", null, ["todoActions"], null);
  const $todoActionsButtons = ["Edit", "Delete"];
  $todoActionsButtons.forEach((element) => {
    const $todoActionsButton = new Image();
    $todoActionsButton.src = element === "Edit" ? EditIcon : DeleteIcon;
    $todoActionsButton.alt = element;
    $todoActionsButton.classList.add("todoActionsButton");
    $todoActionsButton.dataset.todoActionsButton = element;
    $todoActions.append($todoActionsButton);
    $todoActionsButton.addEventListener("click", (event) => {
      if (event.target.dataset.todoActionsButton === "Edit") {
        const modal = document.querySelector(".modal");
        renderModal("editTask", event.target.parentElement.parentElement);
        // alerter(event.target.parentElement.parentElement.dataset.todoId);
        modal.showModal();
        alerter("Edit");
      }
      if (event.target.dataset.todoActionsButton === "Delete") {
        alerter(event.target.parentElement.parentElement.dataset.todoId);
        // var data = JSON.parse(localData);
        data = data.filter(
          (element) =>
            element.id.toString() !==
            event.target.parentElement.parentElement.dataset.todoId.toString()
        );
        alerter(data);
        const newData = JSON.stringify(data);
        localStorage.setItem("data", newData);
        event.target.parentElement.parentElement.remove();

        // alerter("Delete");
      }
    });
  });

  // const $checklist = createElement(
  //   "div",
  //   null,
  //   ["todoChildList", "todoChildElement"],
  //   null
  // );
  // element.checklist.forEach((element) => {
  //   const $checklistItem = createElement("div", null, null, null);
  //   const $checklistItemText = createElement("p", null, null, element.text);
  //   const $checklistItemCheckbox = createElement("input", null, null, null);
  //   $checklistItemCheckbox.type = "checkbox";
  //   $checklistItemCheckbox.checked = element.checked;
  //   $checklistItem.append($checklistItemText);
  //   $checklistItem.append($checklistItemCheckbox);
  //   $checklist.append($checklistItem);
  // });
  $todoChildContent.append($title, $category, $project, $dueDate, $priority);
  $todo.append($todoChildContent);
  // $todo.append($desc);
  $todo.append($todoActions);
  // $todo.append($checklist);
  target.append($todo);
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.actionBarButton === "Add Task") {
    const modal = document.querySelector(".modal");
    renderModal("addTask");
    modal.showModal();
    // alerter("Add Task");
  }
  if (event.target.dataset.actionBarButton === "Add Project") {
    alerter("Add Project");
  }
});
export { render as createMainContent, renderData, renderElement };
