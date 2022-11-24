import { meta } from "../lib/apiLoader.js";

let login = document.getElementById("login");
login.addEventListener("change", async () => {
  cookie.pwd = login.component.value;
  if (!(await meta.auth(cookie.pwd))) login.component.value = "";
  else location.pathname = "../";
});
