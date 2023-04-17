import fs from "fs/promises";
import { PlaybackHandler } from "./playback.js";

let playbacks = {};

export const listPlaybacks = async () => {
  return (await fs.readdir("playbacks"))
    .map((value) => value.split(".")[0])
    .sort((a, b) => b - a);
};

export const getPlaybacks = async () => {
  let allPlaybacks = await listPlaybacks();
  allPlaybacks = allPlaybacks.map((value) => {
    return {
      id: value,
      loaded: Boolean(playbacks[value]),
    };
  });

  allPlaybacks.sort((a, b) => b.id - a.id);

  return allPlaybacks;
};

export const getAppEvent = async (playbackId, appEventId) => {
  let playback = await getPlayback(playbackId);
  return playback.getAppEvent(appEventId);
};

export const deleteAppEvent = async (playbackId, appEventId) => {
  let playback = await getPlayback(playbackId);
  return playback.deleteAppEvent(appEventId);
};

export const getAppEvents = async (playbackId) => {
  let playback = await getPlayback(playbackId);
  return playback.getAppEvents();
};

export const getEvents = async (playbackId) => {
  let playback = await getPlayback(playbackId);
  return playback.getEvents();
};

export const getFavorite = async (playbackId) => {
  let favorites = await getFavorites();
  return favorites.includes(playbackId);
};

export const setFavorite = async (playbackId, favorite) => {
  let favorites = await getFavorites();
  if (favorites.includes(playbackId) && !favorite)
    favorites.splice(favorites.indexOf(playbackId), 1);
  else if (!favorites.includes(playbackId) && favorite)
    favorites.push(playbackId);

  await fs.writeFile("favorites.json", JSON.stringify({ favorites }));
};

export const getFavorites = async () => {
  return JSON.parse(await fs.readFile("favorites.json", "utf8")).favorites;
};

const getPlayback = async (playbackId) => {
  if (!playbacks[playbackId])
    playbacks[playbackId] = await new PlaybackHandler(
      "playbacks/" + playbackId + ".json"
    );
  return playbacks[playbackId];
};

export const registerAppEvent = async (event) => {
  (await getLatestPlayback()).registerAppEvent(event);
};

const getLatestPlayback = async () => {
  return await getPlayback((await listPlaybacks())[0]);
};

const managePlaybacks = async () => {
  let currentPlaybackFound = false;

  for (let playbackId in playbacks) {
    let playback = await getPlayback(playbackId);
    if (
      new Date(playback.playback.time).toDateString() ==
      new Date().toDateString()
    ) {
      currentPlaybackFound = true;
    } else {
      delete playbacks[playbackId];
    }
  }

  if (!currentPlaybackFound) {
    let playback = { events: {}, time: Date.now() };
    let instance = new PlaybackHandler(
      "playbacks/" + playback.time + ".json",
      playback
    );
    playbacks[playback.time] = instance;
  }
};

const manageLoop = async () => {
  await managePlaybacks();
  setTimeout(() => manageLoop(), 60000);
};

try {
  await getLatestPlayback();
} catch (e) {
  console.log(
    "Could not load latest Playback. This is probably the first run."
  );
}
await manageLoop();
