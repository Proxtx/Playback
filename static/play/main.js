import { playback } from "../lib/apiLoader.js";
import * as _ from "../lib/guiLoader.js";

let eventsWrap = document.getElementById("eventsWrap");

let playbackId = new URL(location.href).searchParams.get("id");
const title = document.getElementById("title");

let events = await playback.getEvents(cookie.pwd, playbackId);
events.sort((a, b) => a.start - b.start);

for (let event of events) {
  let elem = document.createElement("p-event");
  await uiBuilder.ready(elem);
  await elem.component.loadEvent(playbackId, event);
  if (title.getAttribute("subtitle") == "Loading")
    title.setAttribute("subtitle", elem.component.date.innerText);
  eventsWrap.appendChild(elem);
}
