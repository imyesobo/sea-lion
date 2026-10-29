import json from "@rollup/plugin-json";
import { fromRollup } from "@web/dev-server-rollup";

/**
 * Turns `import './x.css'` into a module that injects a <style> tag, mirroring what Vite did for
 * the preview. Only project CSS is handled so Storybook's own assets are untouched.
 *
 * @returns {import('rollup').Plugin}
 */
const cssInject = () => ({
  name: "sea-lion-css-inject",
  transform(code, id) {
    if (!id.endsWith(".css") || id.includes("node_modules")) return null;
    return {
      code: `const style = document.createElement("style");
style.textContent = ${JSON.stringify(code)};
document.head.append(style);
export default style;`,
      map: null,
    };
  },
});

// Project CSS/JSON imported from JS must be served as JavaScript modules by the dev server.
const jsMimeTypes = {
  "**/src/**/*.css": "js",
  "**/.storybook/**/*.css": "js",
  "**/custom-elements.json": "js",
};

/** @type {import('@web/storybook-framework-web-components').StorybookConfig} */
export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.js"],
  // `@web/storybook-addon-mocks` serves the service worker and applies `parameters.mocks`; the
  // recorder preset adds a dev-server middleware that writes them to `.interactions/`.
  addons: [
    "@storybook/addon-docs",
    "@web/storybook-addon-mocks",
    {
      name: "web-mocks-recorder/storybook",
      options: { outputDir: ".interactions", pathSegments: 1 },
    },
  ],
  framework: {
    name: "@web/storybook-framework-web-components",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  wdsFinal: (config) => ({
    ...config,
    mimeTypes: { ...config.mimeTypes, ...jsMimeTypes },
    plugins: [
      ...(config.plugins ?? []),
      fromRollup(json)({ include: "**/custom-elements.json" }),
      fromRollup(cssInject)(),
    ],
  }),
  rollupFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), json(), cssInject()],
  }),
};
