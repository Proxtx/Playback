import { playback } from "../lib/apiLoader.js";

let playbackId = await playback.getLatestPlayback(cookie.pwd);
const appEventsHolder = document.getElementById("appEventsHolder");

let newestAppEvent = 0;

const getNewAppEvent = async () => {
  let events = await playback.getAppEvents(cookie.pwd, playbackId);
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
for (let i = 2; i < 13; i++)
  if (events[events.length - 1])
    appEventsHolder.appendChild(
      await createAppEvent(playbackId, events[events.length - i].id)
    );

newAppEventLoop();
