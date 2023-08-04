import { $container, createElement } from "./index";
import { formatDistance, quartersToYears, subDays } from "date-fns";
import { alerter } from "./alerts";
// import { data } from "./type";
import { renderModal } from "./modal";

import EditIcon from "./icons/Edit.svg";
import DeleteIcon from "./icons/delete.png";
import "./styles/mainContent.css";

let localData = localStorage.getItem("data");
localData = localData ? localData : "[]";
let data = JSON.parse(localData);
// data.splice(15, 1);
alerter(data);
// let toInsert = {
//   title: element.title,
//   description: element.description,
//   category: element.category,
//   project: element.project,
//   dueDate: element.dueDate,
//   checklist: element.checklist,
// };
// data.push(toInsert);

const newData = JSON.stringify(data);
localStorage.setItem("data", newData);

function renderData() {
  // alerter(json);

  data.forEach((element) => renderElement(element));
}

function render() {
  renderModal();

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

  $content.append($optionsContainer);
  $contentContainer.append($content);
  target.append($contentContainer);
  // renderData();
}
function renderElement(element) {
  // alerter(element);
  const target = $container.querySelector("#content");
  const $todo = createElement("div", null, ["todoChild"], null);
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
  const $dueDate = createElement(
    "p",
    null,
    ["todoChildDate", "todoChildElement"],
    element.dueDate
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
        alerter("Edit");
        alerter(event.target.parentElement.parentElement.dataset);
      }
      if (event.target.dataset.todoActionsButton === "Delete") {
        alerter("Delete");
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
  $todo.append($title);
  // $todo.append($desc);

  $todo.append($project);
  $todo.append($category);
  $todo.append($dueDate);
  $todo.append($priority);
  $todo.append($todoActions);
  // $todo.append($checklist);
  target.append($todo);
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.actionBarButton === "Add Task") {
    const modal = document.querySelector(".modal");
    modal.showModal();
    alerter("Add Task");
  }
  if (event.target.dataset.actionBarButton === "Add Project") {
    alerter("Add Project");
  }
});
export { render as createMainContent, renderData, renderElement };
