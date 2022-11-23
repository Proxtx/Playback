import { playback } from "../lib/apiLoader.js";

const link = async (href) => {
  await new Promise((r) => setTimeout(r, 500));
  location.href = href;
};

const replay = async () => {
  let url = new URL(window.location);
  url.pathname = "../play/";
  url.searchParams.set("id", await playback.getLatestPlayback(cookie.pwd));
  link(url.href);
};

window.link = link;
window.replay = replay;
