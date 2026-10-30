import { html } from "lit";

/** `<sea-badge>` is a small presentational label. It has no events. */
export default {
  title: "Components/Badge",
  component: "sea-badge",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style.",
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      table: { defaultValue: { summary: "default" } },
    },
    label: { description: "Default slot content.", control: "text" },
  },
  args: { variant: "default", label: "Badge" },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/badge/sea-badge.js';",
          "```",
          "",
          "```html",
          '<sea-badge variant="secondary">v0.1.0</sea-badge>',
          "```",
          "",
          "Purely presentational — no events. If you need a clickable badge, wrap it in a",
          '`<sea-button variant="ghost">` or an `<a>` so it stays keyboard accessible.',
        ].join("\n"),
      },
    },
  },
  render: ({ variant, label }) =>
    html`<sea-badge variant=${variant}>${label}</sea-badge>`,
};

export const Playground = {};

export const Variants = {
  render: () => html`
    <div class="sl-story-row">
      <sea-badge>Default</sea-badge>
      <sea-badge variant="secondary">Secondary</sea-badge>
      <sea-badge variant="destructive">Destructive</sea-badge>
      <sea-badge variant="outline">Outline</sea-badge>
    </div>
  `,
};
