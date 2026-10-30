import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-tabs>` is `LionTabs`: roving tabindex, arrow-key navigation and the full `tablist` /
 * `tab` / `tabpanel` ARIA wiring, restyled as the Shadcn segmented control.
 */
export default {
  title: "Navigation/Tabs",
  component: "sea-tabs",
  tags: ["autodocs"],
  argTypes: {
    selectedIndex: {
      description:
        "Index of the active tab. Read it or set it to move programmatically.",
      control: { type: "number", min: 0 },
    },
  },
  args: { selectedIndex: 0 },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/tabs/sea-tabs.js';",
          "```",
          "",
          'Tabs and panels are **alternating light DOM children** — the first `slot="tab"` pairs with',
          'the first `slot="panel"`, and so on:',
          "",
          "```html",
          "<sea-tabs>",
          '  <button slot="tab">Account</button>',
          '  <div slot="panel">Make changes to your account here.</div>',
          '  <button slot="tab">Password</button>',
          '  <div slot="panel">Change your password here.</div>',
          "</sea-tabs>",
          "```",
          "",
          "### Reacting to tab changes",
          "",
          "> **`selected-changed` does not bubble.** Add the listener to the `<sea-tabs>` element",
          "> itself — delegating from a parent will silently never fire.",
          "",
          "```js",
          "const tabs = document.querySelector('sea-tabs');",
          "",
          "tabs.addEventListener('selected-changed', () => {",
          "  console.log(tabs.selectedIndex); // 0, 1, 2 …",
          "});",
          "```",
          "",
          "Switch tabs from code by assigning the index:",
          "",
          "```js",
          "tabs.selectedIndex = 2;",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ selectedIndex }) => html`
    <sea-tabs .selectedIndex=${selectedIndex}>
      <button slot="tab">Account</button>
      <div slot="panel">Make changes to your account here.</div>
      <button slot="tab">Password</button>
      <div slot="panel">Change your password here.</div>
      <button slot="tab">Billing</button>
      <div slot="panel">Manage your subscription.</div>
    </sea-tabs>
  `,
};

export const Playground = {};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Click a tab, or focus one and use the arrow keys. `selected-changed` carries no detail — " +
          "read `.selectedIndex` from the element instead.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-tabs>
        <button slot="tab">Account</button>
        <div slot="panel">Account panel</div>
        <button slot="tab">Password</button>
        <div slot="panel">Password panel</div>
        <button slot="tab">Billing</button>
        <div slot="panel">Billing panel</div>
      </sea-tabs>`,
      {
        selector: "sea-tabs",
        events: ["selected-changed"],
        readState: (tabs) => ({ selectedIndex: tabs.selectedIndex }),
      },
    ),
};
