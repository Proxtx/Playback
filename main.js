import { listen } from "@proxtx/framework";
import { setConfig } from "@proxtx/framework/static.js";
import config from "@proxtx/config";

setConfig({
  ignoreParseHtml: ["/lib/components"],
  customScriptFileExtensions: [".html", ".route"],
});

await listen(config.port);
console.log("Server started. Port:", config.port);
