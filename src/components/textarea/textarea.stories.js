import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-textarea>` is `LionTextarea`, which auto-grows between `rows` and `max-rows`.
 */
export default {
  title: "Forms/Textarea",
  component: "sea-textarea",
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Field label.", control: "text" },
    helpText: {
      name: "help-text",
      description: "Supporting copy.",
      control: "text",
    },
    rows: {
      description: "Minimum number of visible rows.",
      control: { type: "number", min: 1 },
    },
    maxRows: {
      name: "max-rows",
      description:
        "Maximum rows before the textarea scrolls instead of growing.",
      control: { type: "number", min: 1 },
    },
    disabled: { description: "Disables the field.", control: "boolean" },
    modelValue: {
      description: "Current value. Set as a property.",
      control: "text",
    },
  },
  args: {
    label: "Message",
    helpText: "",
    rows: 3,
    maxRows: 6,
    disabled: false,
    modelValue: "",
  },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/textarea/sea-textarea.js';",
          "```",
          "",
          "```html",
          '<sea-textarea label="Message" rows="3" max-rows="6"></sea-textarea>',
          "```",
          "",
          "Events are identical to [`<sea-input>`](/docs/forms-input--docs): listen for",
          "`model-value-changed` and read `.modelValue`.",
          "",
          "```js",
          "const textarea = document.querySelector('sea-textarea');",
          "textarea.addEventListener('model-value-changed', () => {",
          "  console.log(textarea.modelValue);",
          "});",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({ label, helpText, rows, maxRows, disabled, modelValue }) => html`
    <sea-textarea
      label=${label}
      help-text=${helpText}
      rows=${rows}
      max-rows=${maxRows}
      ?disabled=${disabled}
      .modelValue=${modelValue}
    ></sea-textarea>
  `,
};

export const Playground = {};

export const AutoGrowing = {
  name: "Auto growing",
  parameters: {
    docs: {
      description: {
        story:
          "With `max-rows` set, the textarea grows as you type until it reaches the limit, then scrolls.",
      },
    },
  },
  render: () =>
    html`<sea-textarea
      label="Bio"
      help-text="Grows from 2 up to 5 rows."
      rows="2"
      max-rows="5"
    ></sea-textarea>`,
};

export const HandlingEvents = {
  name: "Handling events",
  render: () =>
    withEventLog(html`<sea-textarea label="Message" rows="3"></sea-textarea>`, {
      selector: "sea-textarea",
      events: ["model-value-changed", "user-input-changed", "focused-changed"],
      readState: (el) => ({ modelValue: el.modelValue }),
    }),
};
