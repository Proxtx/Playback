import { playback } from "../lib/apiLoader.js";
import * as _ from "../lib/guiLoader.js";

let eventsWrap = document.getElementById("eventsWrap");

let playbackId = 1669011837093;

let events = await playback.getEvents(cookie.pwd, playbackId);
for (let event of events) {
  let elem = document.createElement("p-event");
  await uiBuilder.ready(elem);
  elem.component.loadEvent(playbackId, event);
  eventsWrap.appendChild(elem);
}
