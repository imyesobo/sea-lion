import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-tooltip>` is `LionTooltip`: popper-based positioning, hover **and** focus triggers, and
 * the `aria-describedby` relation between invoker and content.
 */
export default {
  title: "Overlays/Tooltip",
  component: "sea-tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/tooltip/sea-tooltip.js';",
          "```",
          "",
          "```html",
          "<sea-tooltip>",
          '  <sea-button slot="invoker" variant="outline">Hover me</sea-button>',
          '  <sea-tooltip-content slot="content">Add to library</sea-tooltip-content>',
          "</sea-tooltip>",
          "```",
          "",
          "Like the dialog, the content is teleported into a global overlay container, so the surface",
          "styling lives in the standalone `<sea-tooltip-content>` element.",
          "",
          "The tooltip opens on hover **and** on keyboard focus, so it is reachable without a mouse.",
          "Keep the content short and never put interactive elements inside it — a tooltip cannot be",
          "focused, so buttons or links in it are unreachable. Use a popover or dialog for that.",
          "",
          "### Events",
          "",
          "> **Neither event bubbles.** Listen on the `<sea-tooltip>` element itself.",
          "",
          "```js",
          "const tooltip = document.querySelector('sea-tooltip');",
          "",
          "tooltip.addEventListener('opened-changed', () => {",
          "  console.log(tooltip.opened);",
          "});",
          "",
          "// before-opened is cancelable",
          "tooltip.addEventListener('before-opened', event => {",
          "  if (isTouchDevice) event.preventDefault();",
          "});",
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => html`
    <sea-tooltip>
      <sea-button slot="invoker" variant="outline">Hover me</sea-button>
      <sea-tooltip-content slot="content">Add to library</sea-tooltip-content>
    </sea-tooltip>
  `,
};

export const Playground = {};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Hover the button, then tab to it — the tooltip responds to both.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-tooltip>
        <sea-button slot="invoker" variant="outline"
          >Hover or focus me</sea-button
        >
        <sea-tooltip-content slot="content">Add to library</sea-tooltip-content>
      </sea-tooltip>`,
      {
        selector: "sea-tooltip",
        events: ["before-opened", "opened-changed"],
        readState: (el) => ({ opened: el.opened }),
      },
    ),
};
