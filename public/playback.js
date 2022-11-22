import { auth } from "./meta.js";
import * as playbackLoader from "../private/playbackLoader.js";

export const getAppEvent = async (pwd, playbackId, appEventId) => {
  if (!auth(pwd)) return;
  return await playbackLoader.getAppEvent(playbackId, appEventId);
};
