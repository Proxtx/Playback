import { playback } from "../lib/apiLoader.js";
import * as _ from "../lib/guiLoader.js";

let playbackId = await playback.getLatestPlayback(cookie.pwd);
const appEventsHolder = document.getElementById("appEventsHolder");

let newestAppEvent = 0;

const getNewAppEvent = async () => {
  let events = await playback.getAppEvents(cookie.pwd, playbackId);
  if (events.length == 0) return;
  if (events[events.length - 1].id != newestAppEvent) {
    appEventsHolder.appendChild(
      await createAppEvent(playbackId, events[events.length - 1].id)
    );
  }
  newestAppEvent = events[events.length - 1].id;
};

const createAppEvent = async (playbackId, appEventId) => {
  let appEventElement = document.createElement("p-app-event");
  appEventElement.setAttribute("playbackId", playbackId);
  appEventElement.setAttribute("appEventId", appEventId);
  await uiBuilder.ready(appEventElement);
  await appEventElement.component.loadAppEvent();
  return appEventElement;
};

const newAppEventLoop = async () => {
  await getNewAppEvent();
  setTimeout(() => {
    newAppEventLoop();
  }, 5000);
};

let events = await playback.getAppEvents(cookie.pwd, playbackId);
events.splice(0, events.length - 13 < 0 ? 0 : events.length - 13);
for (let i = 0; i < events.length - 1; i++)
  if (events[i])
    appEventsHolder.appendChild(await createAppEvent(playbackId, events[i].id));

await getNewAppEvent();
document
  .getElementById("title")
  .setAttribute("subtitle", "Watch App Events Happen Live");
newAppEventLoop();
