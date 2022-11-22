import fs from "fs/promises";

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
