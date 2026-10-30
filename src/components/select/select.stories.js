import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-select>` wraps the **native** `<select>` (best mobile and screen-reader behaviour) and
 * only replaces the skin and the chevron.
 */
export default {
  title: "Forms/Select",
  component: "sea-select",
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Field label.", control: "text" },
    helpText: {
      name: "help-text",
      description: "Supporting copy.",
      control: "text",
    },
    disabled: { description: "Disables the field.", control: "boolean" },
  },
  args: { label: "Framework", helpText: "", disabled: false },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/select/sea-select.js';",
          "```",
          "",
          "The native `<select>` goes in the `input` slot — this is lion's light DOM contract, so",
          "options stay plain HTML and work without JavaScript:",
          "",
          "```html",
          '<sea-select label="Framework">',
          '  <select slot="input">',
          '    <option value="lit">Lit</option>',
          '    <option value="lion">Lion</option>',
          '    <option value="sea-lion" selected>sea-lion</option>',
          "  </select>",
          "</sea-select>",
          "```",
          "",
          "### Reading the value",
          "",
          "`.modelValue` is the `value` of the selected `<option>`:",
          "",
          "```js",
          "const select = document.querySelector('sea-select');",
          "select.addEventListener('model-value-changed', () => {",
          "  console.log(select.modelValue); // 'sea-lion'",
          "});",
          "```",
          "",
          "To preselect an option from code, set `.modelValue` to the option value:",
          "",
          "```js",
          "select.modelValue = 'lion';",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ label, helpText, disabled }) => html`
    <sea-select label=${label} help-text=${helpText} ?disabled=${disabled}>
      <select slot="input">
        <option value="lit">Lit</option>
        <option value="lion">Lion</option>
        <option value="sea-lion" selected>sea-lion</option>
      </select>
    </sea-select>
  `,
};

export const Playground = {};

export const Disabled = {
  render: () => html`
    <sea-select label="Framework" disabled>
      <select slot="input">
        <option value="lit">Lit</option>
      </select>
    </sea-select>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story: "Pick a different option to see `model-value-changed` fire.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-select label="Framework">
        <select slot="input">
          <option value="lit">Lit</option>
          <option value="lion">Lion</option>
          <option value="sea-lion" selected>sea-lion</option>
        </select>
      </sea-select>`,
      {
        selector: "sea-select",
        events: ["model-value-changed", "user-input-changed"],
        readState: (el) => ({ modelValue: el.modelValue }),
      },
    ),
};
