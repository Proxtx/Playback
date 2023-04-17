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

export const getFavorite = async (pwd, playbackId) => {
  if (!auth(pwd)) return;
  return playbackLoader.getFavorite(playbackId);
};

export const setFavorite = async (pwd, playbackId, favorite) => {
  if (!auth(pwd)) return;
  playbackLoader.setFavorite(playbackId, favorite);
};

export const getFavorites = async (pwd) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getFavorites();
};

export const registerCustomEvent = async (
  pwd,
  app,
  title,
  description,
  text,
  points
) => {
  if (!auth(pwd)) return;

  playbackLoader.registerAppEvent({
    app,
    type: title,
    text: description,
    media: [
      {
        text,
        type: "text/",
      },
    ],
    time: Date.now(),
    points: Number(points),
  });
};
