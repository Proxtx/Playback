import { auth } from "./meta.js";
import * as playbackLoader from "../private/playbackLoader.js";

export const getAppEvent = async (pwd, playbackId, appEventId) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getAppEvent(playbackId, appEventId);
};

export const deleteAppEvent = async (pwd, playbackId, appEventId) => {
  if (!auth(pwd)) return;
  return await playbackLoader.deleteAppEvent(playbackId, appEventId);
};

export const getEvents = async (pwd, playbackId) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getEvents(playbackId);
};

export const getAppEvents = async (pwd, playbackId) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getAppEvents(playbackId);
};

export const getPlaybacks = async (pwd) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getPlaybacks();
};

export const getLatestPlayback = async (pwd) => {
  return (await getPlaybacks(pwd))[0].id;
};
