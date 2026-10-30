import { html } from "lit";

const infoIcon = html`
  <svg
    slot="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
`;

/** `<sea-alert>` is a presentational callout with an optional leading icon. */
export default {
  title: "Components/Alert",
  component: "sea-alert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style.",
      control: "select",
      options: ["default", "destructive"],
      table: { defaultValue: { summary: "default" } },
    },
    title: { description: "Content of the `title` slot.", control: "text" },
    description: { description: "Default slot content.", control: "text" },
    withIcon: {
      name: "icon slot",
      description: "Render an icon.",
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    title: "Heads up!",
    description: "You can add components to your app using the CLI.",
    withIcon: true,
  },
  parameters: {
    docs: {
      description: {
        component: [
          "```js",
          "import '@yesobo/sea-lion/src/components/alert/sea-alert.js';",
          "```",
          "",
          "```html",
          "<sea-alert>",
          '  <svg slot="icon" viewBox="0 0 24 24"><!-- … --></svg>',
          '  <span slot="title">Heads up!</span>',
          "  You can add components to your app using the CLI.",
          "</sea-alert>",
          "```",
          "",
          "The icon slot is optional; the layout reflows automatically when it is empty.",
          "",
          "No events. For an alert that must interrupt the user, reach for",
          "[`<sea-dialog>`](/docs/overlays-dialog--docs) instead — it manages focus.",
        ].join("\n"),
      },
    },
  },
  render: ({ variant, title, description, withIcon }) => html`
    <sea-alert variant=${variant}>
      ${withIcon ? infoIcon : ""}
      <span slot="title">${title}</span>
      ${description}
    </sea-alert>
  `,
};

export const Playground = {};

export const Variants = {
  render: () => html`
    <div class="sl-story-stack" style="max-width: 32rem">
      <sea-alert>
        ${infoIcon}
        <span slot="title">Heads up!</span>
        You can add components to your app using the CLI.
      </sea-alert>
      <sea-alert variant="destructive">
        <span slot="title">Something went wrong</span>
        Your session has expired. Please log in again.
      </sea-alert>
    </div>
  `,
};
