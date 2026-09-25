import Handlebars from "handlebars";
import template from "bundle-text:./template.hbs";
const templateCompiled = Handlebars.compile(template);

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const list = document.getElementById("users");
const url = "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name";

function request(e) {
  e.preventDefault();
  list.innerHTML = "";
  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      const filteredUsers = users.filter(
        (user) =>
          user.name.includes(input.value) ||
          user.username.includes(input.value),
      );
      const html = templateCompiled(filteredUsers);
      list.insertAdjacentHTML("beforeend", html);
    });
}

btn.addEventListener("click", request);
