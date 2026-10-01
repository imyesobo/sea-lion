import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-input>` is `LionInput`: a real `<input>` in the light DOM with lion's label, help-text,
 * formatting, parsing, validation and ARIA wiring — restyled with the Shadcn input recipe.
 */
export default {
  title: "Forms/Input",
  component: "sea-input",
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Field label, rendered in the `label` slot.",
      control: "text",
    },
    helpText: {
      name: "help-text",
      description: "Supporting copy under the field.",
      control: "text",
    },
    placeholder: { description: "Native input placeholder.", control: "text" },
    type: {
      description: "Native input type.",
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: { description: "Disables the field.", control: "boolean" },
    readonly: { description: "Makes the field read-only.", control: "boolean" },
    modelValue: {
      description: "Current value. Set as a property.",
      control: "text",
    },
  },
  args: {
    label: "Email",
    helpText: "We never share your address.",
    placeholder: "",
    type: "text",
    disabled: false,
    readonly: false,
    modelValue: "",
  },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/input/sea-input.js';",
          "```",
          "",
          "```html",
          '<sea-input label="Email" help-text="We never share your address."></sea-input>',
          "```",
          "",
          "### Reading the value",
          "",
          "Lion models the value as `.modelValue`, which is the parsed value rather than the raw",
          "string in the DOM. Always read `.modelValue` instead of `.value`:",
          "",
          "```js",
          "const input = document.querySelector('sea-input');",
          "",
          "input.addEventListener('model-value-changed', () => {",
          "  console.log(input.modelValue);",
          "});",
          "```",
          "",
          "`model-value-changed` fires for **both** user edits and programmatic changes. When you only",
          "care about the user, check `event.detail.isTriggeredByUser` or listen for",
          "`user-input-changed` instead.",
          "",
          "```js",
          "input.addEventListener('model-value-changed', event => {",
          "  if (event.detail.isTriggeredByUser) save(input.modelValue);",
          "});",
          "```",
          "",
          "All of these events bubble, so a form can listen once at the top:",
          "",
          "```js",
          "form.addEventListener('model-value-changed', event => {",
          "  console.log(event.target.name, event.target.modelValue);",
          "});",
          "```",
        ].join("\n"),
      },
    },
  },
  render: ({
    label,
    helpText,
    placeholder,
    type,
    disabled,
    readonly,
    modelValue,
  }) => html`
    <sea-input
      label=${label}
      help-text=${helpText}
      placeholder=${placeholder}
      type=${type}
      ?disabled=${disabled}
      ?readonly=${readonly}
      .modelValue=${modelValue}
    ></sea-input>
  `,
};

export const Playground = {};

export const WithHelpText = {
  name: "With help text",
  render: () =>
    html`<sea-input
      label="Username"
      help-text="Letters, numbers and underscores only."
    ></sea-input>`,
};

export const States = {
  parameters: {
    docs: {
      description: {
        story: "Disabled and read-only fields keep their label and help text.",
      },
    },
  },
  render: () => html`
    <div class="sl-story-stack">
      <sea-input label="Default"></sea-input>
      <sea-input label="Disabled" disabled></sea-input>
      <sea-input
        label="Read-only"
        readonly
        .modelValue=${"Cannot edit"}
      ></sea-input>
    </div>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Type in the field to see the full event sequence lion emits. Note that `model-value-changed` " +
          "arrives after the value has already been parsed, so `.modelValue` is always current when you read it.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-input
        label="Email"
        help-text="Type to see events."
      ></sea-input>`,
      {
        selector: "sea-input",
        events: [
          "model-value-changed",
          "user-input-changed",
          "focused-changed",
          "touched-changed",
          "dirty-changed",
        ],
        readState: (input) => ({ modelValue: input.modelValue }),
      },
    ),
};
