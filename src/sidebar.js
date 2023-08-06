/* eslint-disable import/no-cycle */
import { $container, createElement } from "./index";
import { renderData } from "./mainContent";
import "./styles/sidebar.css";

function render() {
  const $sidebar = createElement("div", "sidebar", null, null);
  const $mainCategory = createElement("div", "mainCategory", null, null);
  const $mainCategoryTitle = createElement("h2", null, null, "Calendar");
  const $mainCategoryList = createElement("ul", null, null, null);
  const $mainCategoryListItems = ["All Tasks", "Today", "Next 7 Days"];
  $mainCategoryListItems.forEach((element) => {
    const $mainCategoryListItem = createElement(
      "li",
      null,
      ["mainCategoryItem"],
      element
    );
    $mainCategoryListItem.dataset.mainCategoryItem = element;
    $mainCategoryList.append($mainCategoryListItem);
  });
  $mainCategory.append($mainCategoryTitle, $mainCategoryList);
  const $secondCategory = createElement("div", "secondCategory", null, null);
  const $secondCategoryTitle = createElement("h2", null, null, "Projects");
  const $secondCategoryList = createElement("ul", null, null, null);
  const $secondCategoryListItems = localStorage.getItem("projects").split(",");
  $secondCategoryListItems.forEach((element) => {
    const $secondCategoryListItem = createElement(
      "li",
      null,
      ["secondCategoryItem"],
      element
    );
    $secondCategoryListItem.dataset.secondCategoryItem = element;
    $secondCategoryListItem.addEventListener("click", () => {
      renderData(element);
    });
    $secondCategoryList.append($secondCategoryListItem);
  });
  $secondCategory.append($secondCategoryTitle, $secondCategoryList);
  $sidebar.append($mainCategory, $secondCategory);
  const target = $container.querySelector("#main");
  target.append($sidebar);
  //   $container.append($sidebar);
}

function openNav() {
  document.getElementById("sidebar").style.marginLeft = "0";
}

function closeNav() {
  document.getElementById("sidebar").style.marginLeft = "-250px";
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.mainCategoryItem === "All Tasks") {
    // console.log("goto all tasks");
    renderData("all");
  }
  if (event.target.dataset.mainCategoryItem === "Today") {
    // console.log("goto today");
    renderData("today");
  }
  if (event.target.dataset.mainCategoryItem === "Next 7 Days") {
    // console.log("goto next 7 days");
    renderData("next7days");
  }
});
export { render as createSidebar, openNav, closeNav };
