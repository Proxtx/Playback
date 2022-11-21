export let events = {};

export const registerAppEvent = (eventData) => {
  let id = events[1] ? Math.floor(Math.random() * 100000) : 1;
  events[id] = eventData;
};
