export class Component {
  constructor(options) {
    this.options = options;
    this.document = options.shadowDom;
    this.title = this.document.getElementById("title");
    this.text = this.document.getElementById("text");
    this.img = this.document.getElementById("img");
    this.time = this.document.getElementById("time");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "playbackid":
        this.playbackId = newValue;
        this.loadAppEvent();
        break;
      case "appeventid":
        this.appEventId = newValue;
        this.loadAppEvent();
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
    console.log(appEvent);

    this.title.innerText = appEvent.app + " - " + appEvent.type;
    this.text.innerText = appEvent.text;
    this.img.src = "data:image/jpg;base64, " + appEvent.media[0].buffer;
  }
}
