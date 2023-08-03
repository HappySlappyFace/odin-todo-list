import { createHeader } from "./header";
import { createSidebar, closeNav, openNav } from "./sidebar";
import { createMainContent, renderData } from "./mainContent";
import { alerter } from "./alerts";
import { data } from "./type";
import "./styles/style.css";
import "./styles/normalize.css";

const $container = document.querySelector("#container");
function createElement(tag, idName, classNames, text) {
  const $element = document.createElement(tag);
  if (idName) $element.id = idName;
  if (classNames)
    classNames.forEach((element) => {
      $element.classList.add(element);
    });
  if (text) $element.textContent = text;
  return $element;
}

function displayMain() {
  const $main = createElement("div", "main", null, null);
  $container.append($main);
  createSidebar();
  createMainContent();
  renderData();
}
var sidebarStatus = true;
document.addEventListener("click", (event) => {
  if (event.target.dataset.headerItem === "burger") {
    console.log(sidebarStatus);
    if (!sidebarStatus) {
      openNav();
      sidebarStatus = true;
    } else {
      closeNav();
      sidebarStatus = false;
    }
  }

  if (event.target.dataset.headerItem === "home") {
    console.log("goto home");
  }
  if (event.target.dataset.headerItem === "progress") {
    console.log("show progress");
  }
});

// alerter("huh " + data.todoCompleted);
createHeader();
displayMain();
export { $container, createElement };
