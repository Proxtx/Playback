import { events } from "../private/events.js";
import { auth } from "./meta.js";

export const getAppEvent = (pwd, id) => {
  if (!auth(pwd)) return;
  return getAppEvent(id);
};
