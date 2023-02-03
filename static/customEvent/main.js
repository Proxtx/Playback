import { playback } from "/lib/apiLoader.js";

const app = document.getElementById("app");
const title = document.getElementById("title");
const description = document.getElementById("description");
const text = document.getElementById("text");
const points = document.getElementById("points");
const send = document.getElementById("send");

send.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  await playback.registerCustomEvent(
    cookie.pwd,
    app.component.value,
    title.component.value,
    description.component.value,
    text.component.value,
    points.component.value
  );
  location.pathname = "/";
});
