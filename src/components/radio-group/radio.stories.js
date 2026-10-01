import { html } from "lit";
import { withEventLog } from "../../../.storybook/story-helpers.js";

/**
 * `<sea-radio-group>` holds `<sea-radio>` children and exposes the selected value. Lion owns the
 * roving tabindex and arrow-key navigation that radio groups require.
 */
export default {
  title: "Forms/Radio",
  component: "sea-radio",
  tags: ["autodocs"],
  argTypes: {
    label: { description: "Radio label.", control: "text" },
    checked: {
      description: "Whether this radio is selected.",
      control: "boolean",
    },
    disabled: { description: "Disables the radio.", control: "boolean" },
    choiceValue: {
      description:
        "Value contributed to the group. Must be set as a **property**.",
      control: "text",
    },
  },
  args: { label: "Free", checked: false, disabled: false, choiceValue: "free" },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import 'sea-lion/src/components/radio-group/sea-radio.js';",
          "import 'sea-lion/src/components/radio-group/sea-radio-group.js';",
          "```",
          "",
          "```html",
          '<sea-radio-group name="plan" label="Plan">',
          '  <sea-radio label="Free"></sea-radio>',
          '  <sea-radio label="Pro"></sea-radio>',
          "</sea-radio-group>",
          "```",
          "",
          "As with checkboxes, `choiceValue` is a **property**:",
          "",
          "```js",
          "document.querySelector('sea-radio').choiceValue = 'free';",
          "```",
          "",
          "### Reading the value",
          "",
          "Unlike a checkbox group, a radio group holds a single value:",
          "",
          "```js",
          "const group = document.querySelector('sea-radio-group');",
          "group.addEventListener('model-value-changed', () => {",
          "  console.log(group.modelValue); // 'pro'",
          "});",
          "",
          "// preselect",
          "group.modelValue = 'free';",
          "```",
          "",
          "Always give the group a `name` so it submits correctly inside a form.",
        ].join("\n"),
      },
    },
  },
  render: ({ label, checked, disabled, choiceValue }) => html`
    <sea-radio-group name="plan" label="Plan">
      <sea-radio
        label=${label}
        ?checked=${checked}
        ?disabled=${disabled}
        .choiceValue=${choiceValue}
      ></sea-radio>
      <sea-radio label="Pro" .choiceValue=${"pro"}></sea-radio>
    </sea-radio-group>
  `,
};

export const Playground = {};

export const States = {
  render: () => html`
    <sea-radio-group name="states" label="States">
      <sea-radio label="Unselected" .choiceValue=${"a"}></sea-radio>
      <sea-radio label="Selected" checked .choiceValue=${"b"}></sea-radio>
      <sea-radio label="Disabled" disabled .choiceValue=${"c"}></sea-radio>
    </sea-radio-group>
  `,
};

export const HandlingEvents = {
  name: "Handling events",
  parameters: {
    docs: {
      description: {
        story:
          "Select a plan, or focus the group and use the arrow keys — lion handles the keyboard " +
          "interaction and the group reports a single `modelValue`.",
      },
    },
  },
  render: () =>
    withEventLog(
      html`<sea-radio-group name="plan" label="Plan">
        <sea-radio label="Free" .choiceValue=${"free"}></sea-radio>
        <sea-radio label="Pro" .choiceValue=${"pro"}></sea-radio>
        <sea-radio label="Enterprise" .choiceValue=${"enterprise"}></sea-radio>
      </sea-radio-group>`,
      {
        selector: "sea-radio-group",
        events: ["model-value-changed"],
        readState: (group) => ({ modelValue: group.modelValue }),
      },
    ),
};
