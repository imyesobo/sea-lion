import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-switch>` is `LionSwitch` — a form control with `role="switch"` — wearing the Shadcn track
 * and thumb.
 */
export default {
  title: "Forms/Switch",
  component: "sea-switch",
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Switch label.", control: "text" },
    checked: { description: "Whether the switch is on.", control: "boolean" },
    disabled: { description: "Disables the switch.", control: "boolean" },
  },
  args: { label: "Airplane mode", checked: false, disabled: false },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/switch/sea-switch.js';",
          "```",
          "",
          "```html",
          '<sea-switch label="Airplane mode"></sea-switch>',
          "```",
          "",
          "### Reading the state",
          "",
          "A switch is a choice input, so `.checked` is the boolean you usually want. Its",
          "`.modelValue` is the richer `{ value, checked }` object lion uses for all choice inputs:",
          "",
          "```js",
          "const toggle = document.querySelector('sea-switch');",
          "",
          "toggle.addEventListener('model-value-changed', () => {",
          "  console.log(toggle.checked); // true | false",
          "});",
          "```",
          "",
          "```js",
          "// turn it on from code — this also fires model-value-changed",
          "toggle.checked = true;",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ label, checked, disabled }) =>
    html`<sea-switch
      label=${label}
      ?checked=${checked}
      ?disabled=${disabled}
    ></sea-switch>`,
};

export const Playground = {};

export const States = {
  render: () => html`
    <div class="sl-story-stack">
      <sea-switch label="Off"></sea-switch>
      <sea-switch label="On" checked></sea-switch>
      <sea-switch label="Disabled" disabled></sea-switch>
      <sea-switch label="Disabled and on" disabled checked></sea-switch>
    </div>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Toggle the switch. The log shows `.checked`, which is what you normally act on.",
      },
    },
  },
  render: () =>
    withEventLog(html`<sea-switch label="Airplane mode"></sea-switch>`, {
      selector: "sea-switch",
      events: ["model-value-changed"],
      readState: (el) => ({ checked: el.checked }),
    }),
};
