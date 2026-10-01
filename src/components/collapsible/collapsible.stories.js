import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-collapsible>` is `LionCollapsible`: one invoker, one piece of content, and the
 * `aria-expanded` / `aria-controls` wiring handled for you.
 */
export default {
  title: "Navigation/Collapsible",
  component: "sea-collapsible",
  tags: ["autodocs"],
  argTypes: {
    opened: {
      description: "Whether the content is visible.",
      control: "boolean",
    },
  },
  args: { opened: false },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/collapsible/sea-collapsible.js';",
          "```",
          "",
          "```html",
          "<sea-collapsible>",
          '  <sea-button slot="invoker" variant="ghost" size="sm">Toggle details</sea-button>',
          '  <div slot="content">Powered by LionCollapsible.</div>',
          "</sea-collapsible>",
          "```",
          "",
          "### Reacting to open and close",
          "",
          "> **`opened-changed` does not bubble.** Listen on the `<sea-collapsible>` itself.",
          "",
          "```js",
          "const collapsible = document.querySelector('sea-collapsible');",
          "",
          "collapsible.addEventListener('opened-changed', () => {",
          "  console.log(collapsible.opened); // true | false",
          "});",
          "",
          "// open it from code",
          "collapsible.opened = true;",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ opened }) => html`
    <sea-collapsible ?opened=${opened}>
      <sea-button slot="invoker" variant="ghost" size="sm"
        >Toggle details</sea-button
      >
      <div slot="content">
        sea-lion's collapsible is powered by LionCollapsible.
      </div>
    </sea-collapsible>
  `,
};

export const Playground = {};

export const HandlingEvents = {
  name: "Handling events",
  render: () =>
    withEventLog(
      html`<sea-collapsible>
        <sea-button slot="invoker" variant="outline" size="sm"
          >Toggle</sea-button
        >
        <div slot="content">Hidden content.</div>
      </sea-collapsible>`,
      {
        selector: "sea-collapsible",
        events: ["opened-changed"],
        readState: (el) => ({ opened: el.opened }),
      },
    ),
};
