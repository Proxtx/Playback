import { playback } from "../lib/apiLoader.js";

const archiveGrid = document.getElementById("archiveGrid");
let playbacks = await playback.getPlaybacks(cookie.pwd);

const createArchiveBox = (playbackData) => {
  const elem = document.createElement("p-box");
  elem.setAttribute("layout", "flexCenter");
  let dateElem = document.createElement("h4");
  dateElem.innerText = new Date(Number(playbackData.id)).toLocaleDateString();
  let waveElem = document.createElement("m-wave");
  let subtitleElem = document.createElement("a");
  subtitleElem.innerText = playbackData.loaded ? "Loaded" : "Not loaded";
  elem.appendChild(waveElem);
  elem.appendChild(dateElem);
  elem.appendChild(subtitleElem);
  elem.addEventListener("click", async () => {
    await new Promise((r) => setTimeout(r, 500));
    let url = new URL(window.location);
    url.pathname = "../play/";
    url.searchParams.set("id", playbackData.id);
    window.location.href = url.href;
  });
  return elem;
};

for (let playbackData of playbacks)
  archiveGrid.appendChild(createArchiveBox(playbackData));
