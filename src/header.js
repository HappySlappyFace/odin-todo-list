import "./styles/header.css";
import HomeIcon from "./icons/icons8-home.svg";
import BurgerIcon from "./icons/icons8-menu.svg";
import ProgressImage from "./icons/icons8-50-50.png";
import { $container, createElement } from "./index";

function render() {
  const $header = createElement("header", "header", null, null);
  const $headerGroup = createElement("div", null, ["headerGroup"], null);
  const $burger = new Image();
  $burger.classList.add("headerItem");
  $burger.dataset.headerItem = "burger";
  $burger.src = BurgerIcon;
  $burger.alt = "burger";
  const $home = new Image();
  $home.classList.add("headerItem");
  $home.dataset.headerItem = "home";
  $home.src = HomeIcon;
  $home.alt = "home";
  $headerGroup.append($burger, $home);

  const $h1 = createElement("h1", "headerTitle", null, "Dhakkarni");

  const $headerGroup2 = createElement("div", null, ["headerGroup"], null);
  const $progress = createElement("div", "progress", null, null);
  //   const $progressBar = createElement("div", "progress-bar", null, null);
  const $progressBar = new Image();
  $progressBar.classList.add("headerItem");
  $progressBar.dataset.headerItem = "progress";
  $progressBar.src = ProgressImage;
  $progressBar.alt = "progress";
  $headerGroup2.append($progress, $progressBar);

  $header.append($headerGroup, $h1, $headerGroup2);
  $progress.append($progressBar);
  $container.append($header);
}

export { render as createHeader };
