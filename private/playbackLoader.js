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

export const getArchive = async (playbackId) => {
  let playback = await getPlayback(playbackId);
  return playback.playback.archive;
};

export const setArchive = async (playbackId, archive) => {
  let playback = await getPlayback(playbackId);
  playback.playback.archive = archive;
  await playback.savePlayback();
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
    } else if (!playback.playback.archive) {
      await playback.deletePlayback();
      delete playbacks[playbackId];
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
  setTimeout(() => manageLoop(), 1000);
};

try {
  await getLatestPlayback();
} catch (e) {
  console.log(
    "Could not load latest Playback. This is probably the first run."
  );
}
await manageLoop();
