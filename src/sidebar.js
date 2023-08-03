import { $container, createElement } from "./index";
import "./styles/sidebar.css";
function render() {
  const $sidebar = createElement("div", "sidebar", null, null);
  const $mainCategory = createElement("div", "mainCategory", null, null);
  const $mainCategoryTitle = createElement("h2", null, null, "Main Category");
  const $mainCategoryList = createElement("ul", null, null, null);
  const $mainCategoryListItems = ["All Tasks", "Today", "Next 7 Days"];
  $mainCategoryListItems.forEach((element) => {
    const $mainCategoryListItem = createElement(
      "li",
      null,
      ["mainCategoryItem"],
      element
    );
    $mainCategoryList.append($mainCategoryListItem);
  });
  $mainCategory.append($mainCategoryTitle, $mainCategoryList);
  const $secondCategory = createElement("div", "secondCategory", null, null);
  const $secondCategoryTitle = createElement(
    "h2",
    null,
    null,
    "Second Category"
  );
  const $secondCategoryList = createElement("ul", null, null, null);
  const $secondCategoryListItems = ["All Tasks", "Today", "Next 7 Days"]; //this will be fetched from database
  $secondCategoryListItems.forEach((element) => {
    const $secondCategoryListItem = createElement(
      "li",
      null,
      ["secondCategoryItem"],
      element
    );
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

export { render as createSidebar, openNav, closeNav };
