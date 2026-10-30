import { html } from "lit";

/**
 * `<sea-label>` is a standalone label for markup that is **not** a lion form control. Lion fields
 * already render their own label through `slot="label"`, so do not wrap them in this element.
 */
export default {
  title: "Components/Label",
  component: "sea-label",
  tags: ["autodocs"],
  argTypes: {
    text: { description: "Default slot content.", control: "text" },
  },
  args: { text: "Email address" },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/label/sea-label.js';",
          "```",
          "",
          "```html",
          "<sea-label>Email address</sea-label>",
          "```",
          "",
          "### When *not* to use it",
          "",
          "For `<sea-input>`, `<sea-select>`, `<sea-checkbox>` and friends, use the `label`",
          "attribute instead — lion then wires up `aria-labelledby` for you:",
          "",
          "```html",
          '<sea-input label="Email address"></sea-input>',
          "```",
          "",
          "Reach for `<sea-label>` only when labelling something lion does not manage, and",
          "associate it yourself with a native `for`/`id` pair or `aria-labelledby`.",
          "",
          "No events.",
        ].join("\n"),
      },
    },
  },
  render: ({ text }) => html`<sea-label>${text}</sea-label>`,
};

export const Playground = {};
