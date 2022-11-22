import fs from "fs/promises";
import config from "@proxtx/config";

export class PlaybackHandler {
  playback;
  constructor(location) {
    this.location = location;
    return (async () => {
      this.playback = await JSON.parse(await fs.readFile(this.location));
      this.playback = { events: {} };
      return this;
    })();
  }

  registerAppEvent(event) {
    let id = Math.floor(Math.random() * 1000000);
    this.playback.events[id] = event;
    this.savePlayback();
  }

  deleteAppEvent(appEventId) {
    delete this.playback.events[appEventId];
    this.savePlayback();
  }

  getAppEvent(appEventId) {
    return this.playback.events[appEventId];
  }

  getEvents() {
    let events = [];

    for (let id in this.playback.events) {
      let appEvent = this.playback.events[id];
      let found = false;
      for (let event of events) {
        if (
          Number(event.start) - Number(config.interval) < appEvent.time &&
          Number(event.end) + Number(config.interval) > appEvent.time
        ) {
          event.appEvents.push(id);
          event.points += appEvent.points;
          if (event.start > appEvent.time) event.start = appEvent.time;
          if (event.end < appEvent.time) event.end = appEvent.time;
          found = true;
          break;
        }
      }

      if (!found) {
        events.push({
          appEvents: [id],
          start: appEvent.time,
          end: appEvent.time,
          points: appEvent.points,
        });
      }
    }

    return events;
  }

  async savePlayback() {
    await fs.writeFile(this.location, JSON.stringify(this.playback, null, 2));
  }
}
