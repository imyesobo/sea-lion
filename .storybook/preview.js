import { setCustomElementsManifest } from "@web/storybook-framework-web-components";
import manifest from "../custom-elements.json";
import "../define.js";
import "../src/tokens/tokens.css";
import "./preview.css";

/**
 * Feed the generated Custom Elements Manifest to Storybook so every component page gets an
 * attribute/slot/event table straight from the source JSDoc. Static class fields such as
 * `styles` and `variantConfig` are implementation detail, so they are stripped first.
 */
setCustomElementsManifest({
  ...manifest,
  modules: manifest.modules.map((module) => ({
    ...module,
    declarations: (module.declarations ?? []).map((declaration) => ({
      ...declaration,
      members: (declaration.members ?? []).filter((member) => !member.static),
    })),
  })),
});

/**
 * Applies the selected theme to the preview document.
 *
 * sea-lion reads its tokens from CSS custom properties on an ancestor, so switching themes is a
 * matter of swapping the class on <html>. An explicit `light`/`dark` always wins over the
 * `theme-system` default, which is why both classes are set rather than toggling only `dark`.
 *
 * @param {'light' | 'dark'} theme
 */
const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme !== "dark");
  document.body.classList.add("sl-base");
};

/** @type {import('@web/storybook-framework-web-components').Preview} */
const preview = {
  globalTypes: {
    theme: {
      description: "sea-lion colour theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "light",
  },

  decorators: [
    (story, context) => {
      applyTheme(context.globals.theme);
      return story();
    },
  ],

  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Theming",
          "Components",
          [
            "Button",
            "Badge",
            "Alert",
            "Card",
            "Label",
            "Separator",
            "Progress",
          ],
          "Forms",
          "Navigation",
          "Overlays",
        ],
      },
    },
    docs: {
      codePanel: true,
    },
  },
};

export default preview;
