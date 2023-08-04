import { $container, createElement } from "./index";
import { alerter } from "./alerts";
import { renderElement } from "./mainContent";
function render() {
  const target = $container.querySelector("#main");
  // alerter(target);
  const $dialog = createElement("dialog", null, ["modal"], null);
  const $dialogHeader = createElement("div", null, ["modalHeader"], null);
  const $dialogTitle = createElement("h2", null, ["modalTitle"], "Add Task");
  const $dialogClose = createElement("button", null, ["modalClose"], "X");
  document.addEventListener("click", (e) => {
    if (e.target.matches(".modalClose")) {
      $dialog.close();
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
  $dialogFormDateInput.type = "date";
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
    if (!title || !description || !date || !priority) {
      alert("Please fill all the fields");
      return;
    }
    const task = {
      title,
      description,
      date,
      priority,
    };

    console.log(task);
    let localData = localStorage.getItem("data");
    localData = localData ? localData : "[]";
    let data = JSON.parse(localData);
    let toInsert = {
      title: task.title,
      description: task.description,
      category: "todo",
      project: "default",
      dueDate: task.date,
      priority: task.priority,
    };
    data.push(toInsert);
    renderElement(toInsert);

    const newData = JSON.stringify(data);
    localStorage.setItem("data", newData);
    $dialog.close();
  });

  $dialogForm.append(
    $dialogFormTitle,
    $dialogFormDesc,
    $dialogFormDate,
    $dialogFormPriority,
    $dialogFormSubmit
  );

  $dialogBody.append($dialogHeader, $dialogForm);
  $dialog.append($dialogBody);
  target.append($dialog);
}

export { render as renderModal };
