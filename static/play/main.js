import { playback } from "../lib/apiLoader.js";
import * as _ from "../lib/guiLoader.js";

let eventsWrap = document.getElementById("eventsWrap");

let playbackId = new URL(location.href).searchParams.get("id");
const title = document.getElementById("title");
const favoriteCheckbox = document.getElementById("favoriteCheckbox");

let events = await playback.getEvents(cookie.pwd, playbackId);
events.sort((a, b) => a.start - b.start);

favoriteCheckbox.component.checked = await playback.getFavorite(
  cookie.pwd,
  playbackId
);
favoriteCheckbox.addEventListener("change", async () => {
  await playback.setFavorite(
    cookie.pwd,
    playbackId,
    favoriteCheckbox.component.checked
  );
});

let date;

for (let eventIndex in events) {
  title.setAttribute(
    "subtitle",
    `Loading ${Number(eventIndex) + 1} of ${events.length}`
  );
  let event = events[eventIndex];
  let elem = document.createElement("p-event");
  await uiBuilder.ready(elem);
  await elem.component.loadEvent(playbackId, event);
  if (!date) date = elem.component.date.innerText;
  eventsWrap.appendChild(elem);
}

title.setAttribute("subtitle", date ? date : "Date not found.");
