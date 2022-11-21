import config from "@proxtx/config";

export let apps = [];

export const loadApps = async () => {
  apps = [];
  for (let appData of config.apps) {
    let appImport = await import("../apps/" + appData.folder + "/main.js");
    let appInstance = new appImport.App(appData.config);
    apps.push(appInstance);
  }
};

await loadApps();
