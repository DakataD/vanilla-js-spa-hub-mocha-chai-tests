import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { logout as apiLogout } from "./api/api.js";
import { getUserData } from "./utility.js";
import { loginPage, registerPage } from "./view/auth.js";
import { homePage } from "./view/home.js";
import { dashboardPage } from "./view/dashboard.js";
import { detailsPage } from "./view/details.js";
import { editPage } from "./view/edit.js";
import { createPage } from "./view/create.js";
import { searchPage } from "./view/search.js";

const main = document.querySelector("#content");

setUserNav();

document.getElementById("logoutBtn").addEventListener("click", onLogout);

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/dashboard", decorateContext, dashboardPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page("/add-show", decorateContext, createPage);
page("/search", decorateContext, searchPage);
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();

  next();
}



function setUserNav() {
  const userAsJson = sessionStorage.getItem("user");
  const user = userAsJson && JSON.parse(userAsJson);
  const guestDiv = document.querySelector(".guest");
  const userDiv = document.querySelector(".user");
  user != null
    ? [
        (userDiv.style.display = "inline-block"),
        (guestDiv.style.display = "none"),
      ]
    : [
        (userDiv.style.display = "none"),
        (guestDiv.style.display = "inline-block"),
      ];
}

async function onLogout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
