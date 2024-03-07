const {addRoutesFolder} = require("remix-routes-folder");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverModuleFormat: "cjs",
  routes: () => {
    const superadminRoutes = addRoutesFolder("r-superadmin", {urlPath: "superadmin"});
    const notesRoutes = addRoutesFolder("r-notes", {urlPath: "notes"});
    return {...superadminRoutes, ...notesRoutes};
  }
};