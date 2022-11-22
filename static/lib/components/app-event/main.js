export class Component {
  constructor(options) {
    this.options = options;
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.text = this.document.getElementById("text");
    this.img = this.document.getElementById("img");
    this.time = this.document.getElementById("time");
    this.media = this.document.getElementById("media");
    this.right = this.document.getElementById("right");
    this.delete = this.document.getElementById("delete");

    this.delete.addEventListener("click", () => {
      window.playback.deleteAppEvent(
        cookie.pwd,
        this.playbackId,
        this.appEventId
      );

      location = location;
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "playbackid":
        this.playbackId = newValue;
        break;
      case "appeventid":
        this.appEventId = newValue;
        break;
    }
  }

  async loadAppEvent() {
    if (!(this.appEventId && this.playbackId)) return;
    let appEvent = await window.playback.getAppEvent(
      cookie.pwd,
      this.playbackId,
      this.appEventId
    );

    this.appEvent = appEvent;

    this.title.innerText = appEvent.app + " - " + appEvent.type;
    this.text.innerText = appEvent.text;
    document.body.appendChild(this.media);
    await uiBuilder.ready(this.media);
    this.right.appendChild(this.media);
    this.media.component.display(appEvent.media);
    let time = new Date(Number(appEvent.time)).toLocaleTimeString().split(":");
    time.pop();
    this.time.innerText = time.join(":");
  }
}
