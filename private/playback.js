import fs from "fs/promises";
import config from "@proxtx/config";

export class PlaybackHandler {
  playback;
  constructor(location, update = true) {
    this.location = location;
    this.update = update;
    return (async () => {
      this.playback = await JSON.parse(await fs.readFile(this.location));
      this.savePlaybackLoop();
      return this;
    })();
  }

  registerAppEvent(event) {
    let id = Math.floor(Math.random() * 1000000);
    this.playback.events[id] = event;
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
        console.log(
          new Date(
            Number(event.start) - Number(config.interval)
          ).toLocaleTimeString(),
          new Date(Number(appEvent.time)).toLocaleTimeString(),
          new Date(
            Number(event.end) + Number(config.interval)
          ).toLocaleTimeString(),
          new Date(Number(appEvent.time)).toLocaleTimeString(),
          Number(event.start) - Number(config.interval) < appEvent.time,
          Number(event.end) + Number(config.interval) > appEvent.time
        );
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

  async savePlaybackLoop() {
    while (this.update) {
      await this.savePlayback();
      await new Promise((r) => setTimeout(r, 5 * 60000));
    }
  }

  async savePlayback() {
    await fs.writeFile(this.location, JSON.stringify(this.playback, null, 2));
  }
}
