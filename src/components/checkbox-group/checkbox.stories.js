import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-checkbox>` is a single checkbox; `<sea-checkbox-group>` collects several of them into one
 * value. Both come from lion, so the real `<input type="checkbox">` stays in the light DOM and the
 * Shadcn checkmark is only a graphic on top of it.
 */
export default {
  title: "Forms/Checkbox",
  component: "sea-checkbox",
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Checkbox label.", control: "text" },
    checked: {
      description: "Whether the checkbox is checked.",
      control: "boolean",
    },
    disabled: { description: "Disables the checkbox.", control: "boolean" },
    choiceValue: {
      description:
        "Value contributed to the group. Must be set as a **property**.",
      control: "text",
    },
  },
  args: {
    label: "Accept terms",
    checked: false,
    disabled: false,
    choiceValue: "terms",
  },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/checkbox-group/sea-checkbox.js';",
          "import '@yesobo/sea-lion/src/components/checkbox-group/sea-checkbox-group.js';",
          "```",
          "",
          "### `choiceValue` is a property, not an attribute",
          "",
          "Lion keeps `choiceValue` out of the attribute API because it can be any type, not just a",
          "string. In a Lit template use the `.` prefix; in plain HTML set it from JavaScript:",
          "",
          "```js",
          "// Lit",
          "html`<sea-checkbox label=\"Email\" .choiceValue=${'email'}></sea-checkbox>`;",
          "",
          "// plain DOM",
          "document.querySelector('sea-checkbox').choiceValue = 'email';",
          "```",
          "",
          "### Grouping",
          "",
          "```html",
          '<sea-checkbox-group name="preferences" label="Notifications">',
          '  <sea-checkbox label="Email"></sea-checkbox>',
          '  <sea-checkbox label="SMS"></sea-checkbox>',
          "</sea-checkbox-group>",
          "```",
          "",
          "The group's `.modelValue` is an **array** of the `choiceValue`s that are currently checked:",
          "",
          "```js",
          "const group = document.querySelector('sea-checkbox-group');",
          "group.addEventListener('model-value-changed', () => {",
          "  console.log(group.modelValue); // ['email', 'sms']",
          "});",
          "```",
          "",
          "Each child also fires its own `model-value-changed`, and the event bubbles. Check",
          "`event.target` if you need to know which box changed.",
        ].join("\n"),
      },
    },
  },
  render: ({ label, checked, disabled, choiceValue }) =>
    html`<sea-checkbox
      label=${label}
      ?checked=${checked}
      ?disabled=${disabled}
      .choiceValue=${choiceValue}
    ></sea-checkbox>`,
};

export const Playground = {};

export const States = {
  render: () => html`
    <div class="sl-story-stack">
      <sea-checkbox label="Unchecked"></sea-checkbox>
      <sea-checkbox label="Checked" checked></sea-checkbox>
      <sea-checkbox label="Disabled" disabled></sea-checkbox>
      <sea-checkbox
        label="Disabled and checked"
        disabled
        checked
      ></sea-checkbox>
    </div>
  `,
};

export const Group = {
  parameters: {
    docs: {
      description: {
        story: "A group turns several checkboxes into a single array value.",
      },
    },
  },
  render: () => html`
    <sea-checkbox-group name="preferences" label="Notifications">
      <sea-checkbox label="Email" .choiceValue=${"email"}></sea-checkbox>
      <sea-checkbox label="SMS" .choiceValue=${"sms"}></sea-checkbox>
      <sea-checkbox label="Push" .choiceValue=${"push"}></sea-checkbox>
    </sea-checkbox-group>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Tick the boxes and watch `.modelValue` on the group update. The log listens on the " +
          "`<sea-checkbox-group>`, which receives the bubbling events from every child.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-checkbox-group name="preferences" label="Notifications">
        <sea-checkbox label="Email" .choiceValue=${"email"}></sea-checkbox>
        <sea-checkbox label="SMS" .choiceValue=${"sms"}></sea-checkbox>
      </sea-checkbox-group>`,
      {
        selector: "sea-checkbox-group",
        events: ["model-value-changed"],
        readState: (group) => ({ modelValue: group.modelValue }),
      },
    ),
};
