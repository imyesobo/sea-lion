import { mocksPlugin } from "./mocks-plugin.js";

/** @type {import('@storybook/web-components-vite').StorybookConfig} */
export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.js"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  // sea-lion ships plain ESM with bare `lit` and `@lion/ui` specifiers. Pre-bundling them keeps
  // story navigation fast instead of resolving hundreds of deep imports on every reload.
  viteFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), mocksPlugin()],
    optimizeDeps: {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "lit",
        "lit/directives/class-map.js",
      ],
    },
  }),
};
