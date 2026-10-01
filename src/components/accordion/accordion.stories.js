import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-accordion>` is `LionAccordion`. Invokers and panels alternate in the light DOM, exactly as
 * in lion, so the heading level stays yours to choose.
 */
export default {
  title: "Navigation/Accordion",
  component: "sea-accordion",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/accordion/sea-accordion.js';",
          "```",
          "",
          'Each item is a heading containing a button (`slot="invoker"`) followed by its panel',
          '(`slot="content"`). The `sl-accordion-trigger` class styles the button, which lives in the',
          "light DOM and therefore needs the global `tokens.css`:",
          "",
          "```html",
          "<sea-accordion>",
          '  <h3 slot="invoker"><button class="sl-accordion-trigger">Is it accessible?</button></h3>',
          '  <div slot="content">Yes. It follows the WAI-ARIA authoring practices.</div>',
          '  <h3 slot="invoker"><button class="sl-accordion-trigger">Is it styled?</button></h3>',
          '  <div slot="content">Yes, with the Shadcn UI look.</div>',
          "</sea-accordion>",
          "```",
          "",
          "### Reacting to expansion",
          "",
          "> **`expanded-changed` does not bubble.** Listen on the `<sea-accordion>` itself.",
          "",
          "`.expanded` is an **array of open indexes**, because an accordion can have several panels",
          "open at once:",
          "",
          "```js",
          "const accordion = document.querySelector('sea-accordion');",
          "",
          "accordion.addEventListener('expanded-changed', () => {",
          "  console.log(accordion.expanded); // [0, 2]",
          "});",
          "",
          "// open the second panel from code",
          "accordion.expanded = [1];",
          "```",
        ].join("\n"),
      },
    },
  },
  render: () => html`
    <sea-accordion>
      <h3 slot="invoker">
        <button class="sl-accordion-trigger">Is it accessible?</button>
      </h3>
      <div slot="content">
        Yes. It follows the WAI-ARIA authoring practices, courtesy of lion.
      </div>
      <h3 slot="invoker">
        <button class="sl-accordion-trigger">Is it styled?</button>
      </h3>
      <div slot="content">
        Yes. It ships with the Shadcn UI look out of the box.
      </div>
      <h3 slot="invoker">
        <button class="sl-accordion-trigger">Can I extend it?</button>
      </h3>
      <div slot="content">
        That is the whole point — subclass it like any other Lit element.
      </div>
    </sea-accordion>
  `,
};

export const Playground = {};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story: "Open and close panels to watch the `expanded` array change.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-accordion>
        <h3 slot="invoker">
          <button class="sl-accordion-trigger">First</button>
        </h3>
        <div slot="content">First panel</div>
        <h3 slot="invoker">
          <button class="sl-accordion-trigger">Second</button>
        </h3>
        <div slot="content">Second panel</div>
      </sea-accordion>`,
      {
        selector: "sea-accordion",
        events: ["expanded-changed"],
        readState: (el) => ({ expanded: el.expanded }),
      },
    ),
};
