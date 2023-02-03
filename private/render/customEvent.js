import { registerCustomEvent } from "../../public/playback.js";

export const server = async (document, options) => {
  await registerCustomEvent(
    options.req.query.pwd,
    options.req.query.app,
    options.req.query.title,
    options.req.query.description,
    options.req.query.text,
    options.req.query.points
  );
};
