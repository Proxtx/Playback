export class Component {
  expanded = false;

  constructor(options) {
    this.options = options;
    this.document = this.options.shadowDom;
    this.time = this.document.getElementById("time");
    this.date = this.document.getElementById("date");
    this.appNames = this.document.getElementById("appNames");
    this.points = this.document.getElementById("points");
    this.arrow = this.document.getElementById("arrow");
    this.appEventsWrap = this.document.getElementById("appEvents");
    (async () => {
      await uiBuilder.ready(this.document.getElementById("boxWrap"));
      this.boxWrap = this.document.getElementById("boxWrap").component.box;
    })();

    this.arrow.addEventListener("click", () => {
      if (this.expanded) this.collapse();
      else this.expand();
      this.expanded = !this.expanded;
    });
  }

  expand() {
    this.arrow.style.transform = "rotate(90deg)";
    this.date.style.height = "unset";
    let computedDateHeight = getComputedStyle(this.date).height;
    this.date.style.height = "0px";

    this.appEventsWrap.style.height = "initial";
    let computedWrapHeight = getComputedStyle(this.appEventsWrap).height;
    this.appEventsWrap.style.height = "0px";

    this.boxWrap.style.width = "initial";
    let computedBoxWidth = getComputedStyle(this.boxWrap).width;
    this.boxWrap.style.width = computedBoxWidth;

    (async () => {
      await new Promise((r) => setTimeout(r, 10));
      this.date.style.height = computedDateHeight;
      this.appEventsWrap.style.height = computedWrapHeight;
      this.appEventsWrap.style.marginTop = "var(--gap)";
      this.boxWrap.style.width = `calc(${computedBoxWidth} + var(--gap) * 2)`;
      this.boxWrap.style.transform = "translateX(calc(-1 * var(--gap)))";
      this.boxWrap.style.borderRadius = "0px";
    })();

    this.appNames.style.opacity = 0;
  }

  collapse() {
    this.arrow.style.transform = "rotate(0deg)";
    this.date.style.height = "0px";
    this.appEventsWrap.style.height = "0px";
    this.appEventsWrap.style.marginTop = "0";
    this.appNames.style.opacity = 1;
    this.boxWrap.style.transform = "translate(0)";
    this.boxWrap.style.borderRadius = "var(--borderRadius)";

    let prevBoxWidth = getComputedStyle(this.boxWrap).width;
    this.boxWrap.style.width = "initial";
    let computedBoxWidth = getComputedStyle(this.boxWrap).width;
    this.boxWrap.style.width = prevBoxWidth;
    (async () => {
      await new Promise((r) => setTimeout(r, 10));
      this.boxWrap.style.width = computedBoxWidth;
    })();
  }

  async loadEvent(playbackId, eventData) {
    this.points.innerText = eventData.points;
    let time = new Date(Number(eventData.start))
      .toLocaleTimeString()
      .split(":");
    time.pop();
    this.time.innerText = time.join(":");
    this.date.innerText = new Date(
      Number(eventData.start)
    ).toLocaleDateString();

    let appEventList = [];

    for (let appEventId of eventData.appEvents) {
      appEventList.push(await this.createAppEvent(playbackId, appEventId));
    }

    appEventList.sort((a, b) => {
      b.component.appEvent.time - a.component.appEvent.time;
    });

    for (let appEventElement of appEventList) {
      this.appEventsWrap.appendChild(appEventElement);
      this.appNames.innerText += appEventElement.component.appEvent.app + ", ";
    }

    this.appNames.innerText = this.appNames.innerText.substring(
      0,
      this.appNames.innerText.length - 1
    );
  }

  async createAppEvent(playbackId, appEventId) {
    let appEventElement = document.createElement("p-app-event");
    appEventElement.setAttribute("playbackId", playbackId);
    appEventElement.setAttribute("appEventId", appEventId);
    await uiBuilder.ready(appEventElement);
    await appEventElement.component.loadAppEvent();
    return appEventElement;
  }
}
