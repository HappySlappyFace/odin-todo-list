import { $container, createElement } from "./index";
import { data } from "./type";
import "./styles/mainContent.css";
import { alerter } from "./alerts";
import { formatDistance, subDays } from "date-fns";
import json from "./data/data.json";
json.forEach((element) => {
  // alerter(element);
});
function render() {
  const target = $container.querySelector("#main");
  const $contentContainer = createElement(
    "div",
    "contentContainer",
    null,
    null
  );
  const $content = createElement("div", "content", null, null);
  const randomtext = "Lorem ipsum dolor sit amet cons";
  const $h2 = createElement("h2", null, null, randomtext);
  $content.append($h2);
  $contentContainer.append($content);
  target.append($contentContainer);
  // renderData();
}

function renderData() {
  const target = $container.querySelector("#content");
  // alerter(json);

  json.forEach((element) => {
    // alerter(element);
    alerter(formatDistance(subDays(new Date(), 3), new Date()));
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
    // $todo.append($checklist);
    target.append($todo);
  });
}

export { render as createMainContent, renderData };
