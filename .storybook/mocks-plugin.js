import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const mocksRequire = createRequire(require.resolve("@web/mocks/browser.js"));

/** Serve and bundle the worker expected by @web/mocks without a checked-in copy. */
export function mocksPlugin() {
  const source = readFileSync(
    mocksRequire.resolve("msw/mockServiceWorker.js"),
    "utf8",
  );

  return {
    name: "sea-lion-mocks",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.split("?")[0] !== "/__msw_sw__.js") {
          next();
          return;
        }
        response.setHeader("Content-Type", "application/javascript");
        response.end(source);
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "__msw_sw__.js", source });
    },
  };
}
