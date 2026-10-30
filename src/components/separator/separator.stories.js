import { html } from "lit";

/** `<sea-separator>` renders a themed divider with `role="separator"`. */
export default {
  title: "Components/Separator",
  component: "sea-separator",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      description: "Direction of the rule. Mirrored to `aria-orientation`.",
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
  args: { orientation: "horizontal" },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/separator/sea-separator.js';",
          "```",
          "",
          "```html",
          "<sea-separator></sea-separator>",
          '<sea-separator orientation="vertical" style="height: 2rem"></sea-separator>',
          "```",
          "",
          "A vertical separator has no intrinsic height, so give it one via the parent layout or an",
          "explicit `height`.",
          "",
          "No events.",
        ].join("\n"),
      },
    },
  },
  render: ({ orientation }) =>
    orientation === "vertical"
      ? html`<div class="sl-story-row" style="height: 2rem">
          <span>Left</span>
          <sea-separator
            orientation="vertical"
            style="height: 100%"
          ></sea-separator>
          <span>Right</span>
        </div>`
      : html`<sea-separator></sea-separator>`,
};

export const Playground = {};

export const Horizontal = {
  render: () => html`
    <div style="max-width: 24rem">
      <p>Above</p>
      <sea-separator></sea-separator>
      <p>Below</p>
    </div>
  `,
};

export const Vertical = {
  render: () => html`
    <div class="sl-story-row" style="height: 2rem">
      <span>Blog</span>
      <sea-separator
        orientation="vertical"
        style="height: 100%"
      ></sea-separator>
      <span>Docs</span>
      <sea-separator
        orientation="vertical"
        style="height: 100%"
      ></sea-separator>
      <span>Source</span>
    </div>
  `,
};
