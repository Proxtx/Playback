import fs from "fs/promises";
import { PlaybackHandler } from "./playback.js";

let playbacks = {};

export const listPlaybacks = async () => {
  return (await fs.readdir("playbacks"))
    .map((value) => value.split(".")[0])
    .sort((a, b) => b - a);
};

export const getAppEvent = async (playbackId, appEventId) => {
  let playback = await getPlayback(playbackId);
  return playback.getAppEvent(appEventId);
};

export const getEvents = async (playbackId) => {
  let playback = await getPlayback(playbackId);
  return playback.getEvents();
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
